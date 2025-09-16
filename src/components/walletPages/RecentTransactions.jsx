import React from "react";

const RecentTransactions = () => {
  return (
    <div className="flex flex-col p-2 min-h-[300px] rounded-3xl shadow-md ">
      <div className="text-2xl font-[600]"> Recent Transactions</div>
      <div className="flex justify-between p-2 ">
        <div className="flex items-center">
          {/*icons */}
          <div></div>
          {/*details */}
          <div>
            <p>Bank Transfer - GTB ****4567</p>
            <p className="text-sm text-gray-400">2024-02-06 14:30</p>
            <p className="text-sm text-gray-400">Ref: TXN123456789</p>
          </div>
        </div>
        {/*status */}
        <div>
          <p className="font-semibold text-green-400 ">+₦2,500,000</p>
          <p className="border border-green-200 text-sm bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            completed
          </p>
        </div>
      </div>
      <div className="flex justify-between p-2 ">
        <div className="flex items-center">
          {/*icons */}
          <div></div>
          {/*details */}
          <div>
            <p>Bank Transfer - GTB ****4567</p>
            <p className="text-sm text-gray-400">2024-02-06 14:30</p>
            <p className="text-sm text-gray-400">Ref: TXN123456789</p>
          </div>
        </div>
        {/*status */}
        <div>
          <p className="font-semibold text-green-400 ">+₦2,500,000</p>
          <p className="border border-green-200 text-sm bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            completed
          </p>
        </div>
      </div>
      <div className="flex justify-between p-2 ">
        <div className="flex items-center">
          {/*icons */}
          <div></div>
          {/*details */}
          <div>
            <p>Bank Transfer - GTB ****4567</p>
            <p className="text-sm text-gray-400">2024-02-06 14:30</p>
            <p className="text-sm text-gray-400">Ref: TXN123456789</p>
          </div>
        </div>
        {/*status */}
        <div>
          <p className="font-semibold text-red-400 ">+₦2,500,000</p>
          <p className="border border-orange-200 text-sm bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
            completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
