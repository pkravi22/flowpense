import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

export default function useAuth(requiredRole) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwt_decode(token);

      // Check if token expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      // Role check
      if (requiredRole && decoded.role !== requiredRole) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Token error:", err);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router, requiredRole]);
}
