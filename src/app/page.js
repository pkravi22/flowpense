"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const router = useRouter();
  const [token] = useLocalStorage("token", null); // ✅ get token from localStorage

  useEffect(() => {
    if (token) {
      const payload = "admin";
      const destination =
        payload === "admin" ? "/admin/dashboard" : "/user/dashboard";
      router.replace(destination);
    } else {
      router.replace("/login"); // redirect to login if no token
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
