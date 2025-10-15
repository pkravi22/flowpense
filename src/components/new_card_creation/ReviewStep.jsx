import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ReviewStep({ nextStep, prevStep, data, updateData }) {
  const categories = [
    "Travel",
    "Food",
    "Office Supplies",
    "Medical",
    "Gas Station",
    "Software Tools",
    "Transport",
  ];

  // Handle category selection
  const toggleCategory = (category) => {
    const updated = data.blockedCategory?.includes(category)
      ? data.blockedCategory.filter((c) => c !== category)
      : [...(data.blockedCategory || []), category];

    updateData({ blockedCategory: updated });
  };

  const handleNext = () => {
    // Validate that at least some limits are set
    if (
      !data.dailySpendLimit &&
      !data.weeklySpendLimit &&
      !data.monthlyLimit &&
      !data.perTransactionLimit
    ) {
      alert("Please set at least one spending limit");
      return;
    }
    nextStep();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-gray-200 flex justify-between items-center pb-4">
        <p>Set Spending Limits & Restrictions</p>
        <p className="text-[#035638] text-[16px]">Step 3 Of 4</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Daily Spend Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Spend Limit (NGN)
            </label>
            <input
              type="number"
              value={data.dailySpendLimit || ""}
              onChange={(e) =>
                updateData({
                  dailySpendLimit: e.target.value ? Number(e.target.value) : "",
                })
              }
              placeholder="10000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 focus:border-[#035638]"
            />
          </div>

          {/* Weekly Spend Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Spend Limit (NGN)
            </label>
            <input
              type="number"
              value={data.weeklySpendLimit || ""}
              onChange={(e) =>
                updateData({
                  weeklySpendLimit: e.target.value
                    ? Number(e.target.value)
                    : "",
                })
              }
              placeholder="30000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 focus:border-[#035638]"
            />
          </div>

          {/* Monthly Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Spend Limit (NGN)
            </label>
            <input
              type="number"
              value={data.monthlyLimit || ""}
              onChange={(e) =>
                updateData({
                  monthlyLimit: e.target.value ? Number(e.target.value) : "",
                })
              }
              placeholder="50000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 focus:border-[#035638]"
            />
          </div>

          {/* Per Transaction Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Per Transaction Limit (NGN)
            </label>
            <input
              type="number"
              value={data.perTransactionLimit || ""}
              onChange={(e) =>
                updateData({
                  perTransactionLimit: e.target.value
                    ? Number(e.target.value)
                    : "",
                })
              }
              placeholder="2000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 focus:border-[#035638]"
            />
          </div>
        </div>

        {/* Blocked Categories Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Merchant Category Restrictions
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Select Blocked Categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((category, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  checked={data.blockedCategory?.includes(category) || false}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 text-[#035638] focus:ring-[#035638]"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t-2 border-green-600">
        <button
          onClick={prevStep}
          className="px-6 py-2 flex gap-1 items-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
        >
          <ChevronLeft size={14} />
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 flex gap-1 items-center bg-[#035638] text-white rounded-full hover:bg-[#02452e]"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
