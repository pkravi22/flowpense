"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/login"); // redirect to login if no token
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
