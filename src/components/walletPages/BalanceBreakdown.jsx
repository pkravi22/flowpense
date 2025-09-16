import React from "react";

const BalanceBreakdown = () => {
  return (
    <div className="flex flex-col p-2 min-h-[200px] shadow-md text-[24px]">
      BalanceBreakdown
      <div className="flex text-sm w-full justify-between gap-6">
        <div className="flex-1 flex flex-col gap-1 ">
          <p className="text-md">Available Funds</p>
          <div className="flex justify-between items-center">
            <p>Total Balance</p>
            <p>$20000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Reserved funds</p>
            <p className="text-orange-300 text-sm">$4000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Available Balance</p>
            <p className="text-green-300 text-sm">$24000</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-md">Card Allocation</p>
          <div className="flex justify-between items-center">
            <p>Active Cards (42)</p>
            <p>$2,00,000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Frozen Cards (10)</p>
            <p>$18,0000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Pending Transfers</p>
            <p>$20,000</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-md">Monthly Summary</p>
          <div className="flex justify-between items-center">
            <p>Fund This Month</p>
            <p>$2,00,000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Card Spending</p>
            <p>$18,0000</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Net Change</p>
            <p>$20,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceBreakdown;
