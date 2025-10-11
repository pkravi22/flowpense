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
  { name: "Jan", uv: 12000 },
  { name: "Feb", uv: 9000 },
  { name: "Mar", uv: 15000 },
  { name: "Apr", uv: 11000 },
  { name: "May", uv: 17000 },
  { name: "Jun", uv: 14000 },
  { name: "Jul", uv: 10000 },
  { name: "Aug", uv: 16000 },
  { name: "Sep", uv: 19000 },
  { name: "Oct", uv: 13000 },
  { name: "Nov", uv: 21000 },
  { name: "Dec", uv: 18000 },
];

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

const Example = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value / 1000}k`} />
        <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
        <Bar dataKey="uv" shape={<CurvedBar />} fill="#053f23ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
