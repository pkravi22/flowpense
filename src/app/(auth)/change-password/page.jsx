"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const schema = z.object({
  newPassword: z
    .string()
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&#]/, "Must contain a special character"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("New Password:", data.newPassword);
    setShowModal(true);
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    router.push("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-800 px-4 relative">
      <div className="w-full max-w-xs bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-2">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-0">Change Password</h2>
        <p className="smText font-medium mb-2">Create a secure password for your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative flex items-center border rounded-lg px-3 py-2">
            <LockKeyhole className="text-gray-400 pr-2" />
            <input
              {...register("newPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full text-sm outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <p className="text-xs text-red-500">{errors.newPassword?.message}</p>

          <div className="relative flex items-center border rounded-lg px-3 py-2">
            <LockKeyhole className="text-gray-400 pr-2" />
            <input
              {...register("confirmPassword")}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full text-sm outline-none"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 cursor-pointer text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <p className="text-xs text-red-500">{errors.confirmPassword?.message}</p>

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl"
          >
            Change Password
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center relative">
            <div className="flex justify-center mb-4">
              <Image src="/check.svg" alt="check tick"  priority width={120} height={120} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Password Changed!</h3>
            <p className="text-sm text-gray-700 mb-6">
              Your password has been changed successfully. Click below to login with your new password.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
