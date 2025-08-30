"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole } from "lucide-react";

// ✅ Zod Schema for 6-digit code
const schema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must be numeric"),
});

export default function VerifyAccount() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Verification Code:", data.code);
    alert("Code Verified ✅");
  };

  const handleResend = () => {
    alert("Code Resent ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        
       <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 ">
          Verify your account
        </h2>
        <p className="smText font-medium w-2/3 mt-2">
         Enter 6-digit code sent to the email ololo**@gmail.com
        </p>

        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

         
          <div className="flex items-center border rounded-lg px-3 py-2 inputFeild">
            <span className="text-gray-400 pr-2"><LockKeyhole size={20} /></span>
            <input
              {...register("code")}
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full text-sm outline-none"
            />
          </div>
          <p className="text-xs text-red-500 mt-1">{errors.code?.message}</p>

        
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl mt-2"
          >
            Verify
          </button>

          
          <button
            type="button"
            onClick={handleResend}
            className="w-full text-blue-600 py-3 rounded-4xl mt-2 "
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
}
