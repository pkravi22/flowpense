import React from "react";

const RecentTransactions = ({ recentTransactions, onExport, loading }) => {
  const lastFiveTransactions = recentTransactions.slice(0, 4);
  return (
    <div className="flex flex-col p-4 rounded-3xl shadow-md min-h-[300px] bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
      </div>

      {/* ✅ Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-gray-500">Loading transactions...</p>
        </div>
      ) : recentTransactions.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No transactions available.
        </p>
      ) : (
        lastFiveTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between items-center p-3 border-b border-gray-100"
          >
            <div>
              <p className="font-medium capitalize">{tx.txType}</p>
              <p className="text-sm text-gray-400">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Ref: {tx.receipt_url || "N/A"}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  tx.txType === "credit" ? "text-green-600" : "text-blue-600"
                }`}
              >
                ₦{tx.amount.toLocaleString("en-NG")}
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
        ))
      )}
    </div>
  );
};

export default RecentTransactions;
