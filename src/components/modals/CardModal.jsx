"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const CardModal = ({ card, onClose }) => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // trigger animation on mount
  }, []);
  const spentValue = Number(card.spent.replace(/[^0-9.-]+/g, ""));
  const limitValue = Number(card.monthlyLimit.replace(/[^0-9.-]+/g, ""));
  const percentage = limitValue ? (spentValue / limitValue) * 100 : 0;
  return (
    <div className="fixed inset-0 flex z-50">
      {/* Background overlay */}
      <div
        className={`flex-1 bg-black/40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setShow(false);
          setTimeout(onClose, 300); // wait for animation to finish
        }}
      ></div>

      <div
        className={`w-[600px] bg-white shadow-lg h-full p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-0 right-4 text-gray-500 bg-gray-200 p-1 rounded-full hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Top card info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* content */}

          <div
            className="bg-gray-100 rounded-xl p-2 flex flex-col gap-3 text-white  "
            style={{ backgroundColor: card.bgColor }}
          >
            <p>{card.name} Team Card</p>

            <p className="text-[20px]">{card.number}</p>
            <div>
              <div className="flex justify-between items-center text-[12px]">
                <p>Expiry Date</p>
                <p> CVV</p>
              </div>
              <div className="flex justify-between items-center">
                <p>12/27</p>
                <p>123</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md ">
            <div className="flex justify-end">
              <p>{card.status}</p>
            </div>
            <div className="flex flex-col justify-between gap-0">
              <div className="flex  justify-between text-[12px]">
                <p>Team Lead</p>
                <p>Balance</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[20px]  font-medium">{card.person}</p>
                <p className="text-[20px] font-medium">{card.balance}</p>
              </div>
            </div>
            <div className="flex justify-between text-[12px] text-[#B1CBC1]">
              <p>Monthly Limit</p>
              <p>{card.monthlyLimit}</p>
            </div>
            <div className="w-full bg-gray-200 flex items-center rounded-full h-[6px] overflow-hidden">
              <div
                className="bg-[#CED671] h-[4px] rounded-full"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[12px] text-[#B1CBC1]">
              <p>Monthly Spent</p>
              <p>{card.spent}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {["Fund", "Freeze", "Transfer", "Edit"].map((btn, idx) => (
            <button
              key={idx}
              className="flex-1 shadow-md  text-gray-400 py-2 rounded-lg bg-[#FCFDF2] transition"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div>
          <div className="flex border-b border-gray-300 mb-4">
            {["transactions", "approvals", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-green-600 text-green-600"
                    : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div>
            {activeTab === "transactions" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2">01 Sep 2025</td>
                      <td className="px-4 py-2">$100</td>
                      <td className="px-4 py-2">Completed</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2">05 Sep 2025</td>
                      <td className="px-4 py-2">$200</td>
                      <td className="px-4 py-2">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "approvals" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2">Request</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Approver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2">Purchase</td>
                      <td className="px-4 py-2">$150</td>
                      <td className="px-4 py-2">Manager</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2">Subscription</td>
                      <td className="px-4 py-2">$50</td>
                      <td className="px-4 py-2">Director</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Limit & Budget */}
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3">
                  <p className="text-black text-2xl font-bold leading-normal">
                    Limit & Budget
                  </p>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Limit</span>
                      <span className="text-black">{card.monthlyLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Spent</span>
                      <span className="text-black">{card.spent}</span>
                    </div>
                  </div>
                </div>

                {/* Card details */}
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-3">
                  <p className="font-semibold">Card Details</p>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Holder</span>
                      <span className="text-black">{card.person}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email</span>
                      <span className="text-black">
                        {card.email || "pramendra@example.com"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approver</span>
                      <span className="text-black">
                        {card.approver || "Manager"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Approver Email</span>
                      <span className="text-black">
                        {card.approverEmail || "manager@example.com"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Card No</span>
                      <span className="text-black">{card.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
