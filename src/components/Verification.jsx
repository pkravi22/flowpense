"use client";
import { useState } from "react";

export default function Verification() {
  const [files, setFiles] = useState({
    cacCert: null,
    utility1: null,
    bankStmt: null,
    utility2: null,
  });

  const handleFileChange = (e, field) => {
    setFiles({ ...files, [field]: e.target.files[0] });
  };

  return (
    <div className="space-y-6">
      {/* Compliance & Verification */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Compliance & Verification
        </h2>

        {/* Tax ID + CAC Number */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Tax Identification Number (TIN)
            </label>
            <input
              type="text"
              placeholder="Eg: Acme Corporation"
              className="mt-1 w-full border  border-gray-200 rounded-lg p-2"
            />
            <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">CAC Number</label>
            <input
              type="text"
              placeholder="Eg: Acme Corporation"
              className="mt-1 w-full border  border-gray-200 rounded-lg p-2"
            />
            <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>

        {/* VAT/BN */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">
              VAT Registered Number (if applicable)
            </label>
            <input
              type="text"
              placeholder="Eg: Acme Corporation"
              className="mt-1 w-full border  border-gray-200 rounded-lg p-2"
            />
            <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium">BN Number</label>
            <input
              type="text"
              placeholder="Eg: Acme Corporation"
              className="mt-1 w-full border  border-gray-200 rounded-lg p-2"
            />
            <button className="mt-2 bg-green-700 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            { label: "CAC Certificate", field: "cacCert" },
            { label: "Utility Bill 1", field: "utility1" },
            { label: "Recent Bank Statement", field: "bankStmt" },
            { label: "Utility Bill 2", field: "utility2" },
          ].map((item) => (
            <div
              key={item.field}
              className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500"
            >
              <input
                type="file"
                id={item.field}
                className="hidden"
                onChange={(e) => handleFileChange(e, item.field)}
              />
              <label htmlFor={item.field} className="cursor-pointer">
                {files[item.field]
                  ? files[item.field].name
                  : `Click to upload or drag and drop (${item.label})`}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Banking & Funding Information */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Banking & Funding Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Bank Name</label>
            <select className="mt-1 w-full border  border-gray-200 rounded-lg p-2">
              <option>Select Bank</option>
              <option>First Bank</option>
              <option>Access Bank</option>
              <option>Zenith Bank</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Bank Account Number
            </label>
            <input
              type="text"
              placeholder="Enter Account Number"
              className="mt-1 w-full border  border-gray-200 rounded-lg p-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">
              Select Position / Role
            </label>
            <select className="mt-1 w-full border border-gray-200 rounded-lg p-2">
              <option>Auto Filled From Verification</option>
              <option>Manager</option>
              <option>Director</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select className="mt-1 w-full border rounded-lg p-2">
              <option>NGN - Nigerian Naira</option>
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
