import React from "react";

export default function ReviewSummaryStep({ data, nextStep, prevStep }) {
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "Not set";
    return `NGN ${amount.toLocaleString()}`;
  };

  const formatArray = (array) => {
    if (!array || array.length === 0) return "Not set";
    return array.join(", "); // plain strings now
  };

  const details = [
    { label: "Card Type", value: data.cardType || "N/A" },
    { label: "Card Name", value: data.cardName || "N/A" },
    { label: "Team Name", value: data.teamName || "N/A" },
    { label: "Card Holder(s)", value: formatArray(data.cardHolder) },
    { label: "Approver", value: formatArray(data.approver) },
    { label: "Allow Top-ups", value: data.allowTopUps ? "Yes" : "No" },
    { label: "Daily Spend Limit", value: formatCurrency(data.dailySpendLimit) },
    {
      label: "Weekly Spend Limit",
      value: formatCurrency(data.weeklySpendLimit),
    },
    { label: "Monthly Spend Limit", value: formatCurrency(data.monthlyLimit) },
    {
      label: "Per Transaction Limit",
      value: formatCurrency(data.perTransactionLimit),
    },
    { label: "Blocked Categories", value: formatArray(data.blockedCategory) },
  ];

  return (
    <div className="min-h-[400px] overflow-auto">
      <div className="border-b border-gray-200 flex justify-between items-center p-4">
        <p>Review and Create Card</p>
        <p className="text-[#035638] text-[16px]">Step 4 Of 4</p>
      </div>

      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 sm:gap-2 md:gap-4 p-1">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200"
          >
            <p className="text-gray-500 text-sm">{item.label}:</p>
            <p className="text-[#035638] text-base font-medium break-words">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
