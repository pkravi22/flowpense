"use client";
import React, { useState } from "react";
import DateRangePicker from "../../../components/DatePicker";

const Page = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingData = [
    {
      id: 1,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
    {
      id: 2,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
    {
      id: 3,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
  ];

  const processedData = [
    {
      id: 101,
      merchant: "Olive Garden",
      card: "Finance Team Card",
      date: "15 August, 2025",
      amount: "₦50,000",
      status: "Approved",
    },
    {
      id: 102,
      merchant: "Olive Garden",
      card: "HR Team Card",
      date: "14 August, 2025",
      amount: "₦40,000",
      status: "Rejected",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Dashboard</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
        <DateRangePicker />
      </div>

      {/* Tabs */}
      <div>
        <div className="mt-6 w-full flex items-center bg-white h-[45px] p-2 rounded-2xl shadow-md">
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer 
              ${
                activeTab === "pending"
                  ? "bg-blue-300 text-white"
                  : "bg-gray-100 text-black"
              }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer 
              ${
                activeTab === "processed"
                  ? "bg-blue-300 text-white"
                  : "bg-gray-100 text-black"
              }`}
            onClick={() => setActiveTab("processed")}
          >
            Processed
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4 space-y-3">
          {activeTab === "pending" &&
            pendingData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                {/* Left side */}
                <div>
                  <h2 className="font-semibold">{item.merchant}</h2>
                  <p className="text-sm text-gray-500">{item.card}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>

                {/* Amount + Actions */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold">{item.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                      Approve
                    </button>
                    <button className="border border-red-500 text-red-500 px-4 py-1 rounded-md">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "processed" &&
            processedData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                {/* Left side */}
                <div>
                  <h2 className="font-semibold">{item.merchant}</h2>
                  <p className="text-sm text-gray-500">{item.card}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>

                {/* Amount + Status */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold">{item.amount}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
