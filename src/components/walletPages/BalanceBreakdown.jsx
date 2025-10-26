import React from "react";

const BalanceBreakdown = ({
  loading = false,
  totalBalance = 0,
  availableBalance = 0,
  allocatedToCards = 0,
  recentTransactions = [],
}) => {
  // Calculate values from recentTransactions
  const calculateMonthlySummary = () => {
    if (!recentTransactions || recentTransactions.length === 0) {
      return {
        fundThisMonth: 0,
        cardSpending: 0,
        netChange: 0,
      };
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = recentTransactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    });

    const fundThisMonth = monthlyTransactions
      .filter((tx) => tx.amount > 0 && tx.txType === "deposit")
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);

    const cardSpending = monthlyTransactions
      .filter(
        (tx) => tx.txType === "card_funding" || tx.txType === "card_spending"
      )
      .reduce((sum, tx) => sum + Math.abs(tx.amount || 0), 0);

    const netChange = fundThisMonth - cardSpending;

    return { fundThisMonth, cardSpending, netChange };
  };

  const { fundThisMonth, cardSpending, netChange } = calculateMonthlySummary();

  // Calculate reserved funds (total balance minus available balance)
  const reservedFunds = totalBalance - availableBalance;

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col p-6 min-h-[200px] shadow-md rounded-lg bg-white">
        <div className="text-[24px] font-semibold mb-4">Balance Breakdown</div>
        <div className="flex flex-col md:flex-row text-sm w-full justify-between gap-6">
          {[1, 2, 3].map((section) => (
            <div key={section} className="flex-1">
              <SkeletonLoader />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 mt-4 min-h-[200px] shadow-md rounded-lg bg-white">
      <div className="text-[24px] font-semibold mb-4 text-[#035638]">
        Balance Breakdown
      </div>
      <div className="flex flex-col md:flex-row text-sm w-full justify-between gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-lg font-medium text-gray-800">Available Funds</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Total Balance</p>
            <p className="font-semibold">₦{totalBalance.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Reserved funds</p>
            <p className="text-orange-500 font-medium">
              ₦{reservedFunds.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Available Balance</p>
            <p className="text-green-500 font-medium">
              ₦{availableBalance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <p className="text-lg font-medium text-gray-800">Card Allocation</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Active Cards</p>
            <p className="font-semibold">
              ₦{allocatedToCards.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Frozen Cards</p>
            <p className="text-blue-500 font-medium">₦0</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Pending Transfers</p>
            <p className="text-purple-500 font-medium">₦0</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <p className="text-lg font-medium text-gray-800">Monthly Summary</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Fund This Month</p>
            <p className="font-semibold">₦{fundThisMonth.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Card Spending</p>
            <p className="text-red-500 font-medium">
              ₦{cardSpending.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Net Change</p>
            <p
              className={`font-medium ${
                netChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ₦{Math.abs(netChange).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceBreakdown;