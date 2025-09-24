import React from "react";

export default function ReviewSummaryStep({ data }) {
  const details = [
    { label: "Card Type", value: data.cardType || "N/A" },
    { label: "Holder Name", value: data.name || "N/A" },
    { label: "Approver Name", value: data.approver || "N/A" },
    { label: "Currency", value: data.currency || "N/A" },
    { label: "Spending Limit", value: data.limit || "N/A" },
    { label: "Blocked Status", value: data.blocked || "No" },
  ];

  return (
    <div className="">
      <div className="border-b border-gray-200 flex justify-between items-center p-2">
        <p>Review and create Card</p>
        <p className="text-[#035638] text-[16px]">Step 4 Of 6</p>
      </div>{" "}
      {/* Grid with 3 items per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm p-4 border-b border-background">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 bg-gray-50 p-3 rounded-lg "
          >
            <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-base not-italic font-normal leading-4">
              {item.label}:
            </p>
            <p className="text-[color:var(--Foundation-Green-Normal,#035638)] text-xl not-italic font-medium leading-6">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
