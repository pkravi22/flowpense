"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { companyServices } from "@/services/companyServices";

// Zod schema for company registration
const schema = z.object({
  name: z.string().min(2, "Company name is required"),
  rcNumber: z.string().min(2, "RC Number is required"),
  tin: z.string().min(2, "TIN is required"),
  country: z.string().min(2, "Country is required"),
});

export default function RegisterCompany() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
      else router.replace("/login");
    }
  }, [router]);

  const onSubmit = async (data) => {
    if (!token) return toast.error("Token missing!");

    setLoading(true);
    try {
      await companyServices.registerCompany({
        payload: data,
        token,
      });

      toast.success("Company registered successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-2 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-nowrap my-4">
            <Image src="/f1 (1).svg" alt="logo" width={20} height={20} />
            <Image src="/f1 (2).svg" alt="logo" width={180} height={40} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900">
          Register Your Company
        </h2>
        <p className="text-sm text-[#696E7E] mt-1">
          Let's set up your company profile to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Company Name */}
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Company Name"
              className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              disabled={loading}
            />
            <p className="text-xs text-red-500 mt-1">{errors.name?.message}</p>
          </div>

          {/* RC Number */}
          <div>
            <input
              {...register("rcNumber")}
              type="text"
              placeholder="RC Number"
              className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              disabled={loading}
            />
            <p className="text-xs text-red-500 mt-1">
              {errors.rcNumber?.message}
            </p>
          </div>

          {/* TIN */}
          <div>
            <input
              {...register("tin")}
              type="text"
              placeholder="TIN"
              className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              disabled={loading}
            />
            <p className="text-xs text-red-500 mt-1">{errors.tin?.message}</p>
          </div>

          {/* Country */}
          <div>
            <input
              {...register("country")}
              type="text"
              placeholder="Country"
              className="w-full inputFeild rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              disabled={loading}
            />
            <p className="text-xs text-red-500 mt-1">
              {errors.country?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 cursor-pointer hover:bg-green-900 text-white py-3 rounded-4xl mt-2 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register Company"}
          </button>
        </form>
      </div>
    </div>
  );
}
