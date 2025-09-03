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

const data = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 4200 },
  { name: "Sep", uv: 3100 },
  { name: "Oct", uv: 3700 },
  { name: "Nov", uv: 2900 },
  { name: "Dec", uv: 4100 },
];

const Example = () => {
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
