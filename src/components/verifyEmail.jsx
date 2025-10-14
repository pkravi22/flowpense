"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole } from "lucide-react";
import { authService } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Zod Schema for 6-digit code
const schema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must be numeric"),
});

export default function VerifyAccount({ type, email: propEmail }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(propEmail);
const [loading, setLoading] = useState(false);
useEffect(() => {
  if (typeof window !== "undefined") {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setEmail(payload.email || propEmail);
      } catch {
        setEmail(propEmail);
      }
    }
  }
}, [propEmail]);

const onSubmit = async (data) => {
  setLoading(true);
  try {
    if (!token) {
      alert("Token missing!");
      return;
    }
    const res = await authService.verifyEmail({ otp: data.code, token });
    alert("Code Verified Successfully");
    router.push("/login");
  } catch (err) {
    console.error(err.response?.data?.message || "Verification failed");
    alert(err.response?.data?.message || "Verification failed");
  }
};

const handleResend = () => {
  try {
    const response = authService.resendOtp({ token });
    if (response.success) {
      alert("code send successfully");
    }
  } catch (e) {}
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Verify your account
        </h2>
        {email && (
          <p className="smText font-medium w-2/3 mt-2">
            Enter 6-digit code sent to {email}
          </p>
        )}

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
            className="w-full bg-green-800 cursor-pointer hover:bg-green-900 text-white py-3 rounded-4xl mt-2"
          >
            Verify
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="w-full text-blue-600 py-3 rounded-4xl mt-2"
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
}
