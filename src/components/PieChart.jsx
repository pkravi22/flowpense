import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

export default function Piechart({ allExpenses }) {
  const approvedExpenses =
    allExpenses?.expenses?.filter((exp) => exp.status === "Approved") || [];

  // Group by merchant
  const grouped = approvedExpenses.reduce((acc, exp) => {
    if (!acc[exp.merchant]) {
      acc[exp.merchant] = { value: 0, transactions: 0, name: exp.merchant };
    }
    acc[exp.merchant].value += exp.Amount;
    acc[exp.merchant].transactions += 1;
    return acc;
  }, {});

  const data = Object.values(grouped);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px] w-full text-gray-500 font-medium">
        No Data Available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Pie Chart */}
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
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
            const percent = ((value / total) * 100).toFixed(1);
            return [
              `₦${value} (${percent}%) • ${entry.transactions} txns`,
              name,
            ];
          }}
        />
      </PieChart>

      {/* Merchant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 shadow-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <div className="flex flex-col text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500">
                ₦{item.value} • {item.transactions} txns
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
