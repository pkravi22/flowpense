import React from "react";

const BankDetails = () => {
  return (
    <div className="flex flex-col p-2">
      {/* connectedt bank 1 + Recent Transactions 3*/}
      <div className="flex flex-col md:flex-row gap-4 mt-4 ">
        <div className="flex-1 h-[400px] shadow-md p-2">
          <p>Connected Bank</p>
        </div>
        <div className="flex-3 h-[400px] shadow-md p-2">
          <p>Recent Transactions</p>
        </div>
      </div>
      {/* balance breakdown*/}
      <div className="flex-1  bg-amber-400 shadow-md p-2 mt-4">
        <p>Balance Breakdown</p>
      </div>
    </div>
  );
};

export default BankDetails;
