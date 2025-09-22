"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole } from "lucide-react";
import { authService } from "@/services/authServices";

// ✅ Zod Schema for 6-digit code
const schema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must be numeric"),
});

export default function VerifyAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  let email;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiYXNoaXNoa3VtYXJpbmZvNkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJjb21wYW55SWQiOm51bGwsImlhdCI6MTc1NzE4Njg2NywiZXhwIjoxNzU3MTkwNDY3fQ.ZsdzUGPHMoZLeOiylNPlqvfk2cyM94FTVUFr-TPIQOc";
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload);
      email = payload.email || propEmail;
      console.log(email);
    } else {
      email = propEmail;
    }
  } catch (err) {
    email = propEmail;
  }

  const onSubmit = async (data) => {
    try {
      if (!token) {
        alert("Token missing!");
        return;
      }
      console.log("lets verify otp for  forget  password");
      const res = await authService.verifyForgetPasswordOtp({
        otpCode: data.code,
        token,
      });
      console.log("Verification successful:", res);
      alert("Code Verified Successfully");
    } catch (err) {
      console.error(err.response?.data?.message || "Verification failed");
      alert(err.response?.data?.message || "Verification failed");
    }
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
          Enter 6-digit code sent to the {email}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 inputFeild">
            <span className="text-gray-400 pr-2">
              <LockKeyhole size={20} />
            </span>
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
