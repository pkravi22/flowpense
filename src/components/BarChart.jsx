import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// 
const data=[];

const Example = () => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px]  w-full text-gray-500 font-medium">
        No Data Available
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X Axis → Months */}
        <XAxis dataKey="name" />

        {/* Y Axis → Money (0, 5k, 10k…) */}
        <YAxis
          tickFormatter={(value) => `${value / 1000}k`} // converts 5000 → 5k
        />

        {/* Hover details */}
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />

        {/* Bar */}
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
