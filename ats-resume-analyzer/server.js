const http = require("http");
const fs = require("fs");
const path = require("path");
const { Buffer } = require("buffer");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Serve the index.html
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "index.html");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(content);
    }
    res.writeHead(404);
    return res.end("Not found");
  }

  // Handle resume analysis
  if (req.method === "POST" && req.url === "/analyze") {
    let body = [];
    req.on("data", (chunk) => body.push(chunk));
    req.on("end", async () => {
      try {
        const buffer = Buffer.concat(body);
        const bodyStr = buffer.toString("utf8");
        const { resumeBase64, fileType, jobDescription } = JSON.parse(bodyStr);

        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "API key required" }));
        }

        const systemPrompt = `You are an expert ATS (Applicant Tracking System) resume analyzer with 15+ years of HR and recruiting expertise. 
Analyze the provided resume and return ONLY a valid JSON object (no markdown, no extra text) with this exact structure:

{
  "overallScore": <number 0-100>,
  "grade": "<A+|A|A-|B+|B|B-|C+|C|C-|D|F>",
  "summary": "<2-3 sentence overall assessment>",
  "sections": {
    "contactInfo": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "workExperience": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "education": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "skills": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "formatting": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "keywords": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" },
    "quantifiedAchievements": { "score": <0-100>, "status": "<good|warning|poor>", "feedback": "<specific feedback>" }
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": [
    { "priority": "high", "title": "<title>", "description": "<detailed actionable advice>", "example": "<before/after example if applicable>" },
    { "priority": "high", "title": "<title>", "description": "<detailed actionable advice>", "example": "<before/after example if applicable>" },
    { "priority": "medium", "title": "<title>", "description": "<detailed actionable advice>", "example": "<before/after example if applicable>" },
    { "priority": "medium", "title": "<title>", "description": "<detailed actionable advice>", "example": "<before/after example if applicable>" },
    { "priority": "low", "title": "<title>", "description": "<detailed actionable advice>", "example": "<before/after example if applicable>" }
  ],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"],
  "atsCompatibility": {
    "parseable": <true|false>,
    "issues": ["<issue 1>", "<issue 2>"]
  },
  "jobMatch": <null or 0-100 if job description provided>
}

Be specific and actionable. Focus on what will actually improve ATS parsing and recruiter engagement.`;

        const userContent = [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: fileType || "application/pdf",
              data: resumeBase64,
            },
          },
          {
            type: "text",
            text: jobDescription
              ? `Analyze this resume for ATS compatibility and quality. Also evaluate job match against this job description:\n\n${jobDescription}`
              : "Analyze this resume for ATS compatibility and quality. Return only the JSON object.",
          },
        ];

        const anthropicResponse = await fetch(
          "https://api.anthropic.com/v1/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "anthropic-beta": "pdfs-2024-09-25",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 4000,
              system: systemPrompt,
              messages: [{ role: "user", content: userContent }],
            }),
          }
        );

        const result = await anthropicResponse.json();

        if (!anthropicResponse.ok) {
          res.writeHead(anthropicResponse.status, {
            "Content-Type": "application/json",
          });
          return res.end(
            JSON.stringify({
              error: result.error?.message || "API request failed",
            })
          );
        }

        const textContent = result.content.find((c) => c.type === "text");
        if (!textContent) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "No text response from API" }));
        }

        // Clean and parse JSON
        let jsonStr = textContent.text.trim();
        jsonStr = jsonStr.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
        const parsed = JSON.parse(jsonStr);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(parsed));
      } catch (err) {
        console.error("Error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`\n✅ ATS Resume Analyzer running at http://localhost:${PORT}`);
  console.log(`   Open your browser and navigate to http://localhost:${PORT}\n`);
});
