import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewStep({ nextStep, prevStep, data, updateData }) {
  const [errors, setErrors] = useState({});

  const categories = [
    "Travel",
    "Food",
    "Office Supplies",
    "Medical",
    "Gas Station",
    "Software Tools",
    "Transport",
  ];

  const toggleCategory = (category) => {
    const updated = data.blockedCategory?.includes(category)
      ? data.blockedCategory.filter((c) => c !== category)
      : [...(data.blockedCategory || []), category];

    updateData({ blockedCategory: updated });
  };

  // ✅ Validation logic
  const validateLimits = () => {
    const newErrors = {};

    const daily = Number(data.dailySpendLimit) || 0;
    const weekly = Number(data.weeklySpendLimit) || 0;
    const monthly = Number(data.monthlyLimit) || 0;
    const perTxn = Number(data.perTransactionLimit) || 0;

    if (!daily && !weekly && !monthly && !perTxn) {
      newErrors.general = "Please set at least one spending limit.";
    }

    if (weekly && monthly && weekly >= monthly) {
      newErrors.weeklySpendLimit =
        "Weekly limit should be less than monthly limit.";
    }

    if (daily && weekly && daily >= weekly) {
      newErrors.dailySpendLimit =
        "Daily limit should be less than weekly limit.";
    }

    if (perTxn && daily && perTxn >= daily) {
      newErrors.perTransactionLimit =
        "Per transaction limit should be less than daily limit.";
    }

    if (perTxn && weekly && perTxn >= weekly) {
      newErrors.perTransactionLimit =
        "Per transaction limit should be less than weekly limit.";
    }

    if (perTxn && monthly && perTxn >= monthly) {
      newErrors.perTransactionLimit =
        "Per transaction limit should be less than monthly limit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateLimits()) nextStep();
  };

  const handleLimitChange = (field, value) => {
    updateData({ [field]: value ? Number(value) : "" });
    // clear error on change
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
  };

  return (
    <div className=" space-y-6">
      <div className="border-b border-gray-200 flex justify-between items-center  p-6">
        <p className="font-normal">Set Spending Limits & Restrictions</p>
        <p className="text-[#035638] text-[16px] bg-[#FCFDF2] rounded-2xl px-2 py-1">
          Step 3 of 4
        </p>
      </div>

      <div className="space-y-6 p-6">
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
                handleLimitChange("dailySpendLimit", e.target.value)
              }
              placeholder="10000"
              className={`w-full border rounded-lg px-3 py-2 outline-none ${
                errors.dailySpendLimit
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#035638]"
              }`}
            />
            {errors.dailySpendLimit && (
              <p className="text-xs text-red-500 mt-1">
                {errors.dailySpendLimit}
              </p>
            )}
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
                handleLimitChange("weeklySpendLimit", e.target.value)
              }
              placeholder="30000"
              className={`w-full border rounded-lg px-3 py-2 outline-none ${
                errors.weeklySpendLimit
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#035638]"
              }`}
            />
            {errors.weeklySpendLimit && (
              <p className="text-xs text-red-500 mt-1">
                {errors.weeklySpendLimit}
              </p>
            )}
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
                handleLimitChange("monthlyLimit", e.target.value)
              }
              placeholder="50000"
              className={`w-full border rounded-lg px-3 py-2 outline-none ${
                errors.monthlyLimit
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#035638]"
              }`}
            />
            {errors.monthlyLimit && (
              <p className="text-xs text-red-500 mt-1">{errors.monthlyLimit}</p>
            )}
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
                handleLimitChange("perTransactionLimit", e.target.value)
              }
              placeholder="2000"
              className={`w-full border rounded-lg px-3 py-2 outline-none ${
                errors.perTransactionLimit
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-[#035638]"
              }`}
            />
            {errors.perTransactionLimit && (
              <p className="text-xs text-red-500 mt-1">
                {errors.perTransactionLimit}
              </p>
            )}
          </div>
        </div>

        {errors.general && (
          <p className="text-sm text-red-600">{errors.general}</p>
        )}

        {/* Blocked Categories */}
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
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={data.blockedCategory?.includes(category) || false}
                  onChange={() => toggleCategory(category)}
                  className="h-4 w-4 border-[1.5px] border-green-600 rounded-sm appearance-none cursor-pointer 
                 checked:bg-green-900 checked:border-green-900
                 relative checked:before:content-[''] checked:before:absolute checked:before:left-1/2 checked:before:top-1/2 
                 checked:before:w-1.5 checked:before:h-2.5 checked:before:border-white checked:before:border-r-2 checked:before:border-b-2 
                 checked:before:rotate-45 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-between p-6 pt-6 border-t border-green-900">
        {/* Previous Button */}
        <button
          onClick={prevStep}
          className="flex flex-1 items-center justify-center gap-2 px-6 py-2 
               text-green-900 border border-green-900 rounded-full 
               hover:bg-green-50 transition"
        >
          <span className="flex items-center justify-center">
            <ChevronLeft size={16} className=" relative top-[0.5px]" />
          </span>
          <span className="">Previous</span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 px-6 py-2 
               bg-[#035638] text-white rounded-full 
               hover:bg-[#02452e] transition"
        >
          <span className="">Next</span>
          <span className="flex items-center justify-center">
            <ChevronRight size={16} className=" relative top-[0.5px]" />
          </span>
        </button>
      </div>
    </div>
  );
}
