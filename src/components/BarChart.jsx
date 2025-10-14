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

// Curved bar shape
const CurvedBar = (props) => {
  const { x, y, width, height, fill } = props;
  return (
    <path
      d={`
        M${x},${y + height} 
        L${x},${y + 10} 
        Q${x + width / 2},${y - 18} ${x + width},${y + 10} 
        L${x + width},${y + height} 
        Z
      `}
      fill={fill}
    />
  );
};

// Helper to get month name
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function ExpenseBarChart({ allExpenses }) {
  const approvedExpenses = allExpenses?.expenses?.filter(
    (exp) => exp.status === "Approved"
  ) || [];

  // Aggregate total amounts per month
  const monthlyTotals = {};
  approvedExpenses.forEach((exp) => {
    const date = new Date(exp.createdAt);
    const month = monthNames[date.getMonth()];
    if (!monthlyTotals[month]) monthlyTotals[month] = 0;
    monthlyTotals[month] += exp.Amount;
  });

  // Transform into chart-friendly array
  const data = monthNames.map((month) => ({
    name: month,
    uv: monthlyTotals[month] || 0
  }));

  // Check if there is any approved data
  const hasData = approvedExpenses.length > 0;

  if (!hasData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        No Data Available
      </div>
    );
  }

  return (
    <div className="relative w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `₦${value / 1000}k`} />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Bar dataKey="uv" shape={<CurvedBar />} fill="#053f23ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
