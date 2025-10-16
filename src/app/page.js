"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      console.log("in main paeg",token)
      router.replace("/admin/dashboard");
    } else {
      router.replace("/login"); 
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  );
}
