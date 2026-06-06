# ATS Resume Analyzer

An AI-powered resume analyzer that scores your resume against ATS (Applicant Tracking System) criteria and gives detailed improvement suggestions.

## Features

- **ATS Score** (0–100) with letter grade
- **7-section breakdown**: Contact Info, Work Experience, Education, Skills, Formatting, Keywords, Achievements
- **Strengths detection** — what's already working well
- **Missing keywords** — terms to add for better ATS ranking
- **ATS compatibility check** — parsing issues that could hurt you
- **Improvement roadmap** — prioritized, actionable suggestions with before/after examples
- **Job match score** — paste a job description to see how well you match

## Requirements

- Node.js 18 or higher
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

1. **Clone or download** this folder to your machine

2. **Start the server** — no npm install needed (uses only Node.js built-ins):
   ```bash
   node server.js
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

4. **Enter your Anthropic API key** (starts with `sk-ant-...`)  
   Get one at https://console.anthropic.com/

5. **Upload your resume** (PDF, DOC, DOCX, or TXT)

6. Optionally paste a **job description** for a match score

7. Click **Analyze Resume** and get your results in seconds!

## How it works

1. Your resume is converted to base64 in the browser
2. Sent to the local Node.js server at `/analyze`
3. The server calls the Anthropic API (`claude-sonnet-4-20250514`) with your resume
4. Claude analyzes it as an ATS expert and returns structured JSON
5. The UI renders your score, breakdown, and recommendations

## Security

- Your API key is sent only to the Anthropic API — never logged or stored
- Resume content is processed in memory and never written to disk
- Everything runs locally on your machine

## Supported File Types

| Format | Support |
|--------|---------|
| PDF | ✅ Full (native Claude vision) |
| DOCX | ✅ Full |
| DOC | ✅ Full |
| TXT | ✅ Full |

## Troubleshooting

**"API key required" error** — Make sure your key starts with `sk-ant-`

**"Analysis failed" error** — Check your API key has credits at console.anthropic.com

**Port already in use** — Change `PORT = 3000` in `server.js` to another port like 3001

## License

MIT
