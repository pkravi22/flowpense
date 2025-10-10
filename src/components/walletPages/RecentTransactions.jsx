import React from "react";

const RecentTransactions = ({ recentTransactions }) => {
  console.log("Recent Transactions Props:", recentTransactions);

  // handle empty data
  if (!recentTransactions || recentTransactions.length === 0) {
    return (
      <div className="flex flex-col p-4 rounded-3xl shadow-md min-h-[200px]">
        <div className="text-2xl font-[600] mb-2">Recent Transactions</div>
        <p className="text-gray-400 text-center mt-10">
          No transactions found.
        </p>
      </div>
    );
  }
  const lastFourTransactions = recentTransactions.slice(0, 4);
  console.log("lastfourTransaction", lastFourTransactions);
  return (
    <div className="flex flex-col p-4 rounded-3xl shadow-md min-h-[300px]">
      <div className="text-2xl font-[600] mb-3">Recent Transactions</div>

      {lastFourTransactions.map((tx) => (
        <div
          key={tx.id}
          className="flex justify-between items-center p-3 border-b border-gray-100"
        >
          {/* left side */}
          <div className="flex flex-col">
            <p className="font-medium">
              {tx.txType === "card_funding"
                ? "Card Funding"
                : tx.txType === "credit"
                ? "Credit Transaction"
                : "Transaction"}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(tx.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Ref: {tx.receipt_url || "N/A"}
            </p>
          </div>

          {/* right side */}
          <div className="text-right">
            <p
              className={`font-semibold ${
                tx.txType === "credit"
                  ? "text-green-500"
                  : tx.txType === "card_funding"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {tx.txType === "credit" ? "+" : "-"}₦
              {tx.amount.toLocaleString("en-NG")}
            </p>
            <p
              className={`border text-sm rounded-full px-3 py-1 inline-block mt-1 ${
                tx.status === "success"
                  ? "border-green-200 bg-green-100 text-green-600"
                  : "border-orange-200 bg-orange-100 text-orange-600"
              }`}
            >
              {tx.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
