"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { user, token, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      // console.log("in main paeg",token)
      if (user.companyId === null) {
        router.replace("/register-company");
      }
    } else if (token && refreshToken) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/login");
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Loading...
    </div>
  );
}
