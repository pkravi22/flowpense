import Image from "next/image";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

// Custom sharp arrow slice
const SharpArrowSlice = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  fill,
}) => {
  const RADIAN = Math.PI / 180;
  const angle = -midAngle * RADIAN;

  const tipX = cx + outerRadius * Math.cos(angle);
  const tipY = cy + outerRadius * Math.sin(angle);

  const startX = cx + innerRadius * Math.cos(angle - 20);
  const startY = cy + innerRadius * Math.sin(angle - 20);

  const endX = cx + innerRadius * Math.cos(angle + 20);
  const endY = cy + innerRadius * Math.sin(angle + 20);

  const path = `
    M ${cx},${cy}
    L ${startX},${startY}
    L ${tipX},${tipY}
    L ${endX},${endY}
    Z
  `;
  return <path d={path} fill={fill} />;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Piechart({ allExpenses, selectedMonth }) {
  // Filter expenses by selected month
  const approvedExpenses =
    allExpenses?.expenses?.filter((exp) => {
      if (exp.status !== "Approved") return false;

      const expenseDate = new Date(exp.Date || exp.date || exp.createdAt);
      const expenseMonth = expenseDate.getMonth();
      const expenseYear = expenseDate.getFullYear();
      const currentYear = new Date().getFullYear();

      // Filter by month and current year
      return expenseMonth === selectedMonth && expenseYear === currentYear;
    }) || [];

  console.log(
    "Filtered expenses for month",
    selectedMonth,
    ":",
    approvedExpenses
  );

  // Group by merchant
  const grouped = approvedExpenses.reduce((acc, exp) => {
    const merchant = exp.merchant || "Unknown Merchant";
    if (!acc[merchant]) {
      acc[merchant] = { value: 0, transactions: 0, name: merchant };
    }
    acc[merchant].value += exp.Amount || 0;
    acc[merchant].transactions += 1;
    return acc;
  }, {});

  const data = Object.values(grouped);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (!data.length || total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px] w-full text-gray-500 font-medium">
        <Image src="/not.png" width={40} height={40} alt="not_available_data" />
        <p className="mt-2">
          No Data Available for {monthNames[selectedMonth]}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Month Header */}
      <div className="mb-4 text-center">
        <h3 className="font-semibold text-gray-700">
          {monthNames[selectedMonth]} Expenses
        </h3>
        <p className="text-sm text-gray-500">
          Total: ₦{total.toLocaleString()}
        </p>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              shape={<SharpArrowSlice />}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, entry) => {
                const percent =
                  total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return [
                  `₦${value.toLocaleString()} (${percent}%) • ${
                    entry.transactions
                  } txns`,
                  name,
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Merchant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-h-[120px] overflow-y-auto">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 shadow-sm"
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium text-sm truncate">{item.name}</span>
              <span className="text-gray-500 text-xs">
                ₦{item.value.toLocaleString()} • {item.transactions} txns
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}