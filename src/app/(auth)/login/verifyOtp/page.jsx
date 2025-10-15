"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole } from "lucide-react";
import { authService } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      router.replace("/login");
      return;
    }

    setToken(savedToken);

    try {
      const payload = JSON.parse(atob(savedToken.split(".")[1]));
      setEmail(payload.email || propEmail);
    } catch {
      setEmail(propEmail);
    }
  }, [propEmail, router]);

  const onSubmit = async (data) => {
    if (!token) {
      alert("Token missing! Please login again.");
      router.replace("/login");
      return;
    }

    setVerifyLoading(true);
    try {
      const res = await authService.verifyOtpAfterLogin({
        otpCode: data.code,
        token,
      });

      //alert(" Code Verified Successfully!");
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      router.replace("/admin/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || "Verification failed");
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (!token) {
      alert("Token missing! Please login again.");
      router.replace("/login");
      return;
    }

    setResendLoading(true);
    try {
      const res = await authService.resendOtpAfterLogin({ token });
      alert("📩 Code resent successfully to your email!");
      console.log("Resend Response:", res);
    } catch (err) {
      console.error(err.response?.data?.message || "Resend failed");
      alert(err.response?.data?.message || "Resend failed");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:min-h-screen bg-[url(/main.svg)] sm:bg-[url(/bgImage.png)] bg-cover bg-center">
        <div className="p-2 md:px-12 md:py-6">
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
                  Enter 6-digit code sent to{" "}
                  <span className="font-semibold">{email}</span>
                </p>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
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
                    disabled={verifyLoading || resendLoading}
                  />
                </div>
                <p className="text-xs text-red-500 mt-1">
                  {errors.code?.message}
                </p>

                <button
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl mt-2 disabled:opacity-60"
                  disabled={verifyLoading || resendLoading}
                >
                  {verifyLoading ? "Verifying..." : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  className="w-full text-blue-600 py-3 rounded-4xl mt-2 disabled:opacity-60"
                  disabled={resendLoading || verifyLoading}
                >
                  {resendLoading ? "Resending..." : "Resend Code"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative w-[1/2] h-full bg-[#d7ce90]">
          <Image
            src="/main.svg"
            alt="Showcase"
            fill
            priority
            className="absolute object-contain object-center"
          />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
