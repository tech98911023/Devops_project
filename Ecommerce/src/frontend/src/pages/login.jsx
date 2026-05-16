import react from "react"
import { useState } from "react";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { User, Mail, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className="p-8 max-w-md mx-auto space-y-4 bg-blue-50 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
      
      <Input 
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={Mail}
      />

      <Input 
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
      />

      <Button className="w-full mt-4">
        Sign In
      </Button>
    </div>
  )
}
export default Login;