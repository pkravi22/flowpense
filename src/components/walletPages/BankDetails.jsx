import React from "react";

const BankDetails = () => {
  return (
    <div className="flex flex-col p-3 min-h-[430px] rounded-2xl shadow-md gap-2">
      <div className="text-2xl font-[600]"> Bank Details</div>
      <div className="flex items-center justify-between p-2">
        {" "}
        <div className="flex flex-col ">
          <p>Guaranty Trust Bank</p>
          <p>****2323</p>
        </div>
        <div className="border border-green-300 px-4 py-1 text-sm  text-green-400 rounded-full">
          <p>Verified</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-2 ">
        {" "}
        <div className="flex flex-col ">
          <p>First Bank of Nigeria</p>
          <p>****3242</p>
        </div>
        <div className="border border-green-300 px-4 py-1 text-sm  text-green-400 rounded-full">
          <p>Verified</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-2">
        {" "}
        <div className="flex flex-col ">
          <p>United Bank for Africa</p>
          <p>****2323</p>
        </div>
        <div className="border border-orange-300 px-4 py-1 text-sm  text-orange-400 rounded-full">
          <p>Pending</p>
        </div>
      </div>
      <div
        className="text-sm text-black border mt-4 border-black rounded-sm text-center py-1 cursor-pointer"
        onClick={() => alert("Add New Bank Account")}
      >
        + Add New Bank Account
      </div>
    </div>
  );
};

export default BankDetails;
