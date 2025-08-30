"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Email to verify:", data.email);
    alert(`Verification email sent to ${data.email} ✅`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 ">
          Forgot Password
        </h2>
        <p className="text-sm text-[#696E7E]  mt-1">
          Enter your email to receive a verification link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl mt-2"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}
