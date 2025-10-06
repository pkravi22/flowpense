"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-green-400 rounded-full opacity-25"></div>
        <div className="absolute inset-0 border-4 border-[#035638] border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h2 className="text-lg font-semibold text-gray-800">Loading...</h2>
      <p className="text-sm text-gray-500 mt-2">
        Please wait while we prepare the page for you.
      </p>
    </div>
  );
}
