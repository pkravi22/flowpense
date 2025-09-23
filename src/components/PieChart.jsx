import { Cell, Pie, PieChart, Tooltip } from "recharts";

// const data = [
//   { name: "Travel", value: 1200, transactions: 24 },
//   { name: "Food", value: 800, transactions: 15 },
//   { name: "Marketing", value: 600, transactions: 10 },
//   { name: "Software", value: 400, transactions: 8 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const data = [];
export default function Piechart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px]  w-full text-gray-500 font-medium">
        No Data Available
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center">
      {/* Pie Chart */}
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          cornerRadius={5} // makes slices rounded -> arrow-like front
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => {
            const percent = ((value / total) * 100).toFixed(1);
            return [`$${value} (${percent}%)`, name];
          }}
        />
      </PieChart>

      {/* Expense Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 shadow-sm"
          >
            {/* Color indicator */}
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <div className="flex flex-col text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500">
                ${item.value} • {item.transactions} txns
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
