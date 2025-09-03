import { Ellipsis } from "lucide-react";
import React from "react";

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
}) => {
  const statusColor =
    status === "Active"
      ? "text-green-400"
      : status === "Frozen"
      ? "text-yellow-400"
      : status === "Expired"
      ? "text-red-400"
      : "text-gray-400";
  return (
    <div className="m-4">
      <div className="flex justify-between  mb-2 px-4">
        <p className="text-sm">{name}</p>
        <div className="flex items-center gap-2">
          <p className={statusColor}>{status}</p>
          <Ellipsis className=" bg-gray-200 px-1 py-[.2] rounded-3xl" />
        </div>
      </div>
      <div
        className="w-[280px] h-[160px] rounded-2xl p-4"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <div className="flex flex-col justify-between  gap-2 ">
          <div className="flex  justify-between text-sm ">
            <p>Team Lead</p>
            <p>Balance</p>
          </div>
          <div className="flex  justify-between ">
            <p className="text-xl font-semibold ">{person}</p>
            <p className="text-xl font-semibold ">{balance}</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold ">{number}</p>
        </div>
        <div>
          <div className="flex justify-between text-[12px]">
            <p>Monthly Limit</p>
            <p>{monthlyLimit}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[12px]">
            <p>Monthly Spent</p>
            <p>{spent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
