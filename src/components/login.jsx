"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";
import Image from "next/image.js";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && token) {
      toast.success("Login successful! Redirecting...");
      localStorage.setItem("token", token);

      router.push("/login/verifyOtp");
      //router.replace("admin/dashboard");
      dispatch(reset());
    }

    if (isError && message) {
      setError("email", {
        type: "manual",
        message: message || "Invalid credentials",
      });
      resetField("password");
      dispatch(reset());
    }
  }, [
    isSuccess,
    isError,
    token,
    message,
    router,
    dispatch,
    setError,
    resetField,
  ]);

  const handleForgetPassword = () => {
    router.push("/forget-password");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      await dispatch(login(payload));
    } finally {
      setLoading(false);
    }
  };
  if (isSuccess && token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <span className="h-8 w-8 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="flex flex-nowrap ">
            <Image src="/f1 (1).svg" alt="logo" width={20} height={20}></Image>
            <Image src="/f1 (2).svg" alt="logo" width={180} height={40}></Image>
          </div>
        </div>

        <h2 className="text-xl host-grotesk font-semibold text-gray-900 ">
          Login your account
        </h2>
        <p className="text-sm text-[#696E7E] host-grotesk mt-1">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-green-700 font-medium host-grotesk hover:underline"
          >
            Sign Up →
          </a>
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
              disabled={loading || isLoading}
            />
          </div>
          <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>

          <div className="flex items-center inputFeild rounded-lg px-3 py-2 border">
            <span className="text-gray-400 pr-2">
              <LockKeyhole size={20} />
            </span>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              className="w-full text-sm outline-none"
              disabled={loading || isLoading}
            />
          </div>
          <p className="text-xs text-red-500 mt-1">
            {errors.password?.message}
          </p>

          <button
            type="submit"
            disabled={loading || isLoading}
            className={`w-full text-white host-grotesk cursor-pointer py-3 rounded-4xl mt-2 flex items-center justify-center gap-2 ${
              loading || isLoading
                ? "bg-green-800 hover:bg-green-900"
                : "bg-green-800 hover:bg-green-900"
            }`}
          >
            {loading || isLoading ? (
              <>
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            onClick={handleForgetPassword}
            className="w-full text-blue-600 host-grotesk cursor-pointer py-3 rounded-4xl mt-2 "
            disabled={loading || isLoading}
          >
            Forgot your Password?
          </button>
        </form>
      </div>
    </div>
  );
}
