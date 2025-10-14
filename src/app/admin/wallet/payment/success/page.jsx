"use client";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>
      <p className="mb-4">
        Thank you for your payment. Your transaction was successful.
      </p>
      <Link
        href="/admin/dashboard"
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Go to Home
      </Link>
    </div>
  );
}
