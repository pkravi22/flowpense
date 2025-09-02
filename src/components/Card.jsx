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
}) => {
  return (
    <div
      className="w-[280px] h-[160px] rounded-2xl p-4"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex justify-between items-center ">
        <div className="flex flex-col justify-between items-start">
          <p>Team Lead</p>
          <p>{person}</p>
        </div>
        <p className="text-3xl font-semibold ">{balance}</p>
      </div>
      <div>
        <p className="text-3xl font-semibold ">{number}</p>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Monthly Limit</p>
          <p>{monthlyLimit}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Monthly Spent</p>
          <p>{spent}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
