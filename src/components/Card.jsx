import {
  Ellipsis,
  Wallet,
  Trash2,
  Eye,
  Snowflake,
  Edit,
  Settings,
  ArrowUpDown,
  BanknoteArrowUp,
} from "lucide-react";
import React, { useState } from "react";

const Card = ({
  name,
  number,
  person,
  monthlyLimit,
  bgColor,
  textColor,
  spent,
  balance,
  status,
  onViewDetails,
}) => {
  const statusColor =
    status === "Active"
      ? "text-green-400"
      : status === "Frozen"
      ? "text-yellow-400"
      : status === "Expired"
      ? "text-red-400"
      : "text-gray-400";

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleThreeDots = (e) => {
    e.stopPropagation(); // ✅ Prevent card modal from opening
    setDropdownOpen((prev) => !prev);
  };

  const total = parseFloat(String(monthlyLimit).replace(/[^0-9.-]+/g, "")) || 0;
  const spentMoney = parseFloat(String(spent).replace(/[^0-9.-]+/g, "")) || 0;
  const percentage = total > 0 ? (spentMoney / total) * 100 : 0;

  return (
    <div className="w-full sm:w-[300px] h-[180px] cursor-pointer">
      <div className="flex justify-between mb-2 px-4 items-center">
        <p className="text-sm">{name}</p>
        <div className="flex items-center gap-2 relative">
          <p className={statusColor}>{status}</p>
          <Ellipsis
            className="bg-gray-200 px-1 py-[.2rem] rounded-3xl cursor-pointer hover:bg-gray-300"
            onClick={handleThreeDots}
          />
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-6 w-48 bg-white shadow-lg rounded-lg border p-2 z-50">
              <button
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                onClick={() => {
                  onViewDetails(); // ✅ Trigger modal only here
                  setDropdownOpen(false);
                }}
              >
                <Eye size={16} /> View Details
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md">
                <BanknoteArrowUp size={16} /> Fund Card
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md">
                <Snowflake size={16} /> Freeze Card
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md">
                <ArrowUpDown size={16} /> Transfer Balance
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md">
                <Settings size={16} /> Edit Limit
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md">
                <Trash2 size={16} /> Delete Card
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="w-full h-[160px] rounded-2xl p-3 flex flex-col gap-2"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex flex-col justify-between gap-0">
          <div className="flex text-[#B1CBC1] justify-between text-[12px]">
            <p>Team Lead</p>
            <p>Balance</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[20px] text-[#F7FAD7] font-medium">{person}</p>
            <p className="text-[20px] font-medium">{balance}</p>
          </div>
        </div>
        <div>
          <p className="text-[24px] font-medium text-[#FCFDF2] my-1">
            {number}
          </p>
        </div>
        <div className="w-full max-w-md ">
          <div className="flex justify-between text-[12px] text-[#B1CBC1]">
            <p>Monthly Limit</p>
            <p>{monthlyLimit}</p>
          </div>
          <div className="w-full bg-gray-200 flex items-center rounded-full h-[6px] overflow-hidden">
            <div
              className="bg-[#CED671] h-[4px] rounded-full"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[12px] text-[#B1CBC1]">
            <p>Monthly Spent</p>
            <p>{spent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
