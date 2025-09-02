"use client";
import React from "react";

const StatCard = ({ icon, iconBg, title, value, iconColor }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
      <div className={`p-3 rounded-full`} style={{ backgroundColor: iconBg }}>
        {React.cloneElement(icon, { className: "w-6 h-6", color: iconColor })}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-[#2E2E2E] mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
