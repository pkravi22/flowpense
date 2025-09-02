"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
// ✅ Zod Schema for login
const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema),
  });
  const router=useRouter();
   const handleForgetPassword = () => {
    router.push("/forget-password");
  };

  const onSubmit = (data) => {
    console.log("Login Data:", data);

    // Example conditional logic
    if (data.email !== "test@example.com" || data.password !== "123456") {
      setError("email", { type: "manual", message: "Invalid email or password" });
      setError("password", { type: "manual", message: "" });
      return;
    }

    alert("Login Successful ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 ">
          Login to your account
        </h2>
        <p className="text-sm text-[#696E7E]  mt-1">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-700 font-medium hover:underline">
            Sign Up →
          </a>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div className="flex items-center inputFeild rounded-lg px-3 py-2 border">
            <span className="text-gray-400 pr-2"><Mail size={20} /></span>
            <input
              {...register("email")}
              type="email"
              placeholder="namesurname@gmail.com"
              className="w-full text-sm outline-none"
            />
          </div>
          <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>

          
          <div className="flex items-center inputFeild rounded-lg px-3 py-2 border">
            <span className="text-gray-400 pr-2"><LockKeyhole size={20} /></span>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              className="w-full text-sm outline-none"
            />
          </div>
          <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>

         
          

          
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl mt-2"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleForgetPassword}
            className="w-full text-blue-600 py-3 rounded-4xl mt-2 "
          >
           Forgot your Password?
          </button>
        </form>
      </div>
    </div>
  );
}
