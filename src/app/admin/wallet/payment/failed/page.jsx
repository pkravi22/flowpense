"use client";
import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        Payment Failed!
      </h1>
      <p className="mb-4">Your transaction could not be completed. Please try again.</p>
      <Link href="/checkout" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
        Retry Payment
      </Link>
    </div>
  );
}
