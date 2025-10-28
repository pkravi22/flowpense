import React from "react";

const CardSettings = ({ card }) => {
  if (!card) return null;

  const last4Digits = card.CardNumber?.slice(-4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Left Column: Limits */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Card Limits</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Daily Spend Limit</span>
            <span>₹{card.DailySpendLimit}</span>
          </div>
          <div className="flex justify-between">
            <span>Weekly Spend Limit</span>
            <span>₹{card.WeeklySpendLimit}</span>
          </div>
          <div className="flex justify-between">
            <span>Per Transaction Limit</span>
            <span>₹{card.PerTransactionLimit}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Limit</span>
            <span>₹{card.MonthlyLimit}</span>
          </div>
        </div>
        <button className="mt-4 w-full text-gray-800 hover:text-whoite py-2 rounded-lg hover:bg-green-900 border">
          Edit Limits
        </button>
      </div>

      {/* Right Column: Other Details */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Card Details</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Card Name</span>
            <span>{card.CardName}</span>
          </div>
          <div className="flex justify-between">
            <span>Card Type</span>
            <span>{card.CardType}</span>
          </div>
          <div className="flex justify-between">
            <span>Card Holder</span>
            <span>{card.CardHolder.join(", ")}</span>
          </div>
          <div className="flex justify-between">
            <span>Approver</span>
            <span>{card.Approver.join(", ")}</span>
          </div>
          <div className="flex justify-between">
            <span>Blocked Categories</span>
            <span>{card.BlockedCategory.join(", ")}</span>
          </div>
          <div className="flex justify-between">
            <span>Team Name</span>
            <span>{card.TeamName}</span>
          </div>
          <div className="flex justify-between">
            <span>Status</span>
            <span
              className={
                card.status === "Active" ? "text-green-600" : "text-red-600"
              }
            >
              {card.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Balance</span>
            <span>₹{card.CardFunding}</span>
          </div>
          <div className="flex justify-between">
            <span>Card Number (Last 4 digits)</span>
            <span> {last4Digits}</span>
          </div>
        </div>
        <button className="mt-4 w-full border text-gray-800 hover:text-whoite py-2 rounded-lg hover:bg-green-900">
          Modify Approver
        </button>
      </div>
    </div>
  );
};

export default CardSettings;
