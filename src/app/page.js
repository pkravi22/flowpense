"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      // decode token to get role (optional)
      //const payload = JSON.parse(atob(token.split(".")[1]));
      const payload = "admin";
      const destination =
        payload === "admin" ? "/admin/dashboard" : "/user/dashboard";
      router.replace(destination); // redirect to dashboard
    } else {
      router.replace("/login"); // redirect to signin if not logged in
    }
  }, [router]);

  return <div className="flex justify-center items-center">Loading...</div>; // simple placeholder
}
