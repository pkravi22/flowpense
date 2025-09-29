"use client";
import React, { useEffect } from "react";

const BankingInfo = ({ formData, setFormData, registerCompany }) => {
  // Example validation logic: if account number length === 10 → auto-fill account name
  useEffect(() => {
    if (formData.accountNumber && formData.accountNumber.length === 10) {
      setFormData({ ...formData, accountName: "John Doe" }); // Example auto-filled value
    }
  }, [formData.accountNumber]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-[24px] ">Banking & Funding Information</h1>

        <p className="pageSubTitle ">Provide your business banking details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Bank</label>
          <select
            value={formData.bank}
            onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
            className="p-2 rounded border border-gray-300 w-full"
          >
            <option value="">Select Bank</option>
            <option>Bank A</option>
            <option>Bank B</option>
            <option>Bank C</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Bank Account Number
          </label>
          <input
            type="text"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(e) =>
              setFormData({ ...formData, accountNumber: e.target.value })
            }
            className="p-2 rounded border border-gray-300 w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Account Name</label>
          <input
            type="text"
            placeholder="Account Name (auto-filled)"
            value={formData.accountName || ""}
            readOnly
            className="p-2 rounded border border-gray-300 w-full bg-gray-100 text-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="p-2 rounded border border-gray-300 w-full"
          >
            <option value="">Select Currency</option>
            <option>NGN - Nigerian Naira</option>
            <option>USD - US Dollar</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BankingInfo;
