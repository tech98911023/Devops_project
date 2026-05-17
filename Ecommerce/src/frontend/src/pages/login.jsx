import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { Mail, Lock } from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/v1/tasks/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.success) {

        // Optional local storage
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login successful:", data.user);

        // Redirect to homepage
        navigate("/", {
          state: {
            userData: {
              username: data.user.username,
              email: data.user.email
            }
          }
        });

      } else {

        setError(data.message || "Login failed");
      }

    } catch (err) {

      console.error(err);

      setError("Server error");
    }
  };

  return (

    <div className="p-8 max-w-md mx-auto space-y-4 bg-blue-50 rounded-2xl shadow-xl">

      <h2 className="text-2xl font-bold text-gray-800">
        Welcome Back
      </h2>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="john@example.com"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        icon={Lock}
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        className="w-full mt-4"
        onClick={handleLogin}
      >
        Login
      </Button>

    </div>
  );
};

export default Login;