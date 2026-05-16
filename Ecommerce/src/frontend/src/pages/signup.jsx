import react from "react"
import { useState } from "react";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { User, Mail, Lock } from "lucide-react";
const Signup = () => {
 return (
    <div className="p-8 max-w-md mx-auto space-y-4 bg-blue-50 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      
      <Input 
        label="Full Name"
        placeholder="John Doe"
        icon={User}
      />

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
        error="Password must be at least 8 characters"
      />

      <Button className="w-full mt-4">
        Register Now
      </Button>
    </div>
  )
}

export default Signup;