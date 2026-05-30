import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";

import { User, Mail, Lock } from "lucide-react";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://user_service:5000/api/v1/tasks/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        toast.success("User Registered Successfully");

        // Wait 10 seconds
        setTimeout(() => {
          navigate("/login");
        }, 10000);

      } else {

        toast.error(data.message || "Database Error");

      }

    } catch (error) {

      console.error(error);

      toast.error("Server Error");

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSignup}
      className="p-8 max-w-md mx-auto space-y-4 bg-blue-50 rounded-2xl shadow-xl"
    >

      <h2 className="text-2xl font-bold text-gray-800">
        Create Account
      </h2>

      <Input
        label="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="John Doe"
        icon={User}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
        icon={Mail}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        icon={Lock}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-4"
      >
        {loading ? "Registering..." : "Register Now"}
      </Button>

    </form>

  );
};

export default Signup;