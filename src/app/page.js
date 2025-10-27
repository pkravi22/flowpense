"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { user, token, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    // ✅ If user is logged in but no company registered
    if (user?.companyId === null) {
      router.replace("/register-company");
      return;
    }

    // ✅ Logged in and company exists
    router.replace("/admin/dashboard");
  }, [user, token, router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-gray-700">
      <span className="h-6 w-6 border-2 border-green-900 border-t-transparent rounded-full animate-spin mb-2"></span>
      Loading...
    </div>
  );
}
