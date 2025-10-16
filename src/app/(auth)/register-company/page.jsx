"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Fetch token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
      else router.replace("/login"); // redirect if no token
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
      //localStorage.removeItem("token"); // optional: clear token
      router.push("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/logo 1.png" alt="Flowpense" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Register Company
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            type="text"
            placeholder="Company Name"
            className="w-full border p-2 rounded"
            disabled={loading}
          />
          <p className="text-xs text-red-500">{errors.name?.message}</p>

          <input
            {...register("rcNumber")}
            type="text"
            placeholder="RC Number"
            className="w-full border p-2 rounded"
            disabled={loading}
          />
          <p className="text-xs text-red-500">{errors.rcNumber?.message}</p>

          <input
            {...register("tin")}
            type="text"
            placeholder="TIN"
            className="w-full border p-2 rounded"
            disabled={loading}
          />
          <p className="text-xs text-red-500">{errors.tin?.message}</p>

          <input
            {...register("country")}
            type="text"
            placeholder="Country"
            className="w-full border p-2 rounded"
            disabled={loading}
          />
          <p className="text-xs text-red-500">{errors.country?.message}</p>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-2xl mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Company"}
          </button>
        </form>
      </div>
    </div>
  );
}
