"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCallback() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");

  useEffect(() => {
    // Simulate fake verification process (2 seconds)
    const timer = setTimeout(() => {
      setStatusMessage("Payment Verified Successfully!");
      // Redirect after 2 more seconds
      setTimeout(() => {
        router.replace("/admin/wallet"); // replace to prevent back navigation
      }, 2000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <div className="animate-spin-slow mb-4">
          <svg
            className="w-10 h-10 text-green-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-800">{statusMessage}</p>
        <p className="text-sm text-gray-500 mt-2">Verifying Payment...</p>
      </div>
    </div>
  );
}
