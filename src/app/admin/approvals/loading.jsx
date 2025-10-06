"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 border-4 border-[#035638] rounded-full opacity-25"></div>
        <div className="absolute inset-0 border-4 border-[#035638] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">Loading...</h2>
    </div>
  );
}
