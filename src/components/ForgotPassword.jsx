"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authServices";
const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await authService.forgotPassword({ email: data.email });
      toast.success("Otp sent succeefully");
      localStorage.setItem("forgetToken", res.TemporaryToken); // <-- here
      router.push("/forget-password/verify-otp");
    } catch (e) {
  toast.error("error in sending otp");
    }
  };

  const handleVerifyEmail = async () => {
    console.log("Otp sent to ur email");
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>

        <h2 className="text-xl font-semibold host-grotesk text-gray-900 ">
          Forgot Password
        </h2>
        <p className="text-sm text-[#696E7E] host-grotesk  mt-1">
          Enter your email to receive a verification link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="flex items-center inputFeild rounded-lg px-3 py-2 border">
            <span className="text-gray-400 pr-2">
              <Mail size={20} />
            </span>
            <input
              {...register("email")}
              type="email"
              placeholder="namesurname@gmail.com"
              className="w-full text-sm outline-none host-grotesk"
            />
          </div>
          <p className="text-xs host-grotesk text-red-500 mt-1">
            {errors.email?.message}
          </p>

          <button
            type="submit"
            className="w-full host-grotesk bg-green-800 hover:bg-green-900 cursor-pointer text-white py-3 rounded-4xl mt-2"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}
