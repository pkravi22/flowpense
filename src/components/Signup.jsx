"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, LockKeyhole, Check,Eye,EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";

const schema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8),
  confirmPassword: z.string(),
  mobile: z.string().min(10).max(15),
  terms: z.literal(true, { errorMap: () => ({ message: "You must accept terms & conditions" }) }),
}).refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});

export default function Signup() {
  const { handleSubmit, register, control, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const password = watch("password", "");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Signup Successful ");
  };

  const rules = [
    { label: " 8 characters", test: (pw) => pw.length >= 8 },
    { label: "uppercase", test: (pw) => /[A-Z]/.test(pw) },
    { label: " lowercase", test: (pw) => /[a-z]/.test(pw) },
    { label: " number", test: (pw) => /[0-9]/.test(pw) },
    { label: " special character", test: (pw) => /[@$!%*?&#]/.test(pw) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-2 sm:p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">Create an Account</h2>
        <p className="text-sm text-[#696E7E] mt-1">
          Already have an Account{" "}
          <a href="/login" className="text-green-700 font-medium hover:underline">
            Login Account →
          </a>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input {...register("firstName")} placeholder="First Name" className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              <p className="text-xs text-red-500 mt-1">{errors.firstName?.message}</p>
            </div>
            <div>
              <input {...register("lastName")} placeholder="Last Name" className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              <p className="text-xs text-red-500 mt-1">{errors.lastName?.message}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center inputFeild rounded-lg px-3 py-2">
              <Mail size={20} className="text-gray-400 pr-2" />
              <input {...register("email")} type="email" placeholder="namesurname@gmail.com" className="w-full text-sm outline-none" />
            </div>
            <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          <div className="relative">
            <div className="flex items-center inputFeild rounded-lg px-3 py-2">
              <LockKeyhole size={20} className="text-gray-400 pr-2" />
              <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full text-sm outline-none" />
             
            </div>
            <div className="flex flex-wrap  gap-2" >
            {rules.map((rule, i) => (
              <p key={i} className=" border p-1 border-gray-200 rounded-xl text-xs mt-1 flex items-center gap-1" style={{ color: rule.test(password) ? "green" : "gray-300" }}>
                {rule.test(password) && <Check size={14} />} {rule.label}
              </p>
            ))}
            </div>
            <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
          </div>

          <div className="relative">
            <div className="flex items-center inputFeild rounded-lg px-3 py-2">
              <LockKeyhole size={20} className="text-gray-400 pr-2" />
              <input {...register("confirmPassword")} type={showConfirm ? "text" : "password"} placeholder="Confirm password" className="w-full text-sm outline-none" />
              
            </div>
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <div className="w-full">
            <Controller
              name="mobile"
              control={control}
              rules={{ required: "Mobile number is required" }}
              render={({ field }) => (
                <PhoneInput {...field} country="us" enableSearch enableAreaCodes containerClass="w-full" inputClass="w-full text-sm outline-none px-3 py-2" buttonClass="h-full border-r" inputStyle={{ width: "100%" }} buttonStyle={{ flexShrink: 0 }} />
              )}
            />
            <p className="text-xs text-red-500 mt-1">{errors.mobile?.message}</p>
          </div>

          <div className="flex gap-2 smText px-8">
            <input type="checkbox" {...register("terms")} className="mt-0.5 accent-green-700" />
            <p>
              By continuing, you agree to the{" "}
              <a href="#" className="text-[#B7BE64] font-medium hover:underline">Terms & Conditions</a> of Flowpense
            </p>
          </div>
          <p className="text-xs text-red-500">{errors.terms?.message}</p>

          <button type="submit" className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-4xl mt-2">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
