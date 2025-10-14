"use client";
import {
  ArrowUpRight,
  CreditCard,
  Download,
  Plus,
  PlusIcon,
  Users,
  Wallet,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { companyServices } from "@/services/companyServices";
import BankDetails from "../../../components/walletPages/BankDetails";
import RecentTransactions from "../../../components/walletPages/RecentTransactions";
import BalanceBreakdown from "../../../components/walletPages/BalanceBreakdown";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const router = useRouter();

  // Fetch user info from token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const decoded = jwtDecode(storedToken);
          setUserDetail(decoded);
        } catch (err) {
          console.error("Invalid token:", err);
        }
      }
    }
  }, []);

  // Fetch wallet ledger
  const fetchWalletLedger = async () => {
    if (!userDetail || !token) return;
    setLoading(true);
    try {
      const response = await companyServices.getWalletLedger({
        companyId: userDetail.companyId,
        token,
      });

      setRecentTransactions(response.ledger || []);
      console.log("Wallet Ledger:", response);
    } catch (error) {
      console.error("Error fetching wallet ledger:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletLedger();
  }, [userDetail, token]);

  // === Calculate Stats from Ledger ===
  const totalAvailable = recentTransactions
    .filter((tx) => tx.txType === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalAllocated = recentTransactions
    .filter((tx) => tx.txType === "card_funding")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = totalAvailable + totalAllocated;

  // === Stat Cards Data ===
  const cardDetails = [
    {
      id: 1,
      title: "Total Balance",
      value: `₦${totalBalance.toLocaleString()}`,
      icon: <Wallet />,
      iconBg: "#E6FFFA",
      iconColor: "#035638",
      sub: "Available + Allocated Funds",
    },
    {
      id: 2,
      title: "Available Balance",
      value: `₦${totalAvailable.toLocaleString()}`,
      icon: <CreditCard />,
      iconBg: "#FEE2E2",
      iconColor: "#B91C1C",
      sub: "Funds available in wallet",
    },
    {
      id: 3,
      title: "Funds Allocated to Cards",
      value: `₦${totalAllocated.toLocaleString()}`,
      icon: <Users />,
      iconBg: "#E0E7FF",
      iconColor: "#1E40AF",
      sub: "Total amount transferred to cards",
    },
  ];

  // === CSV Export ===
  const exportToCSV = () => {
    if (!recentTransactions.length) {
      alert("No transactions available to export!");
      return;
    }
    const headers = [
      "ID",
      "Transaction Type",
      "Amount",
      "Currency",
      "Balance After",
      "Status",
      "Receipt URL",
      "Created At",
    ];
    const rows = recentTransactions.map((tx) => [
      tx.id,
      tx.txType,
      tx.amount,
      tx.currency,
      tx.balanceAfter,
      tx.status,
      tx.receipt_url || "N/A",
      new Date(tx.createdAt).toLocaleString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wallet_transactions_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="pageTitle">Wallet</h1>
          <p className="pageSubTitle mt-2">
            Manage organization funds and transfer to cards
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center px-2 rounded-[10px] border p-1"
            onClick={exportToCSV}
          >
            <Download className="mr-2" size={16} />
            <span className="text-sm">Export Statement</span>
          </button>

          <button
            className="flex items-center px-2 rounded-[10px] border p-1 bg-[#035638] text-white"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2" size={16} />
            <span className="text-sm">Fund Wallet</span>
          </button>
        </div>
      </div>

      {/* === Stat Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cardDetails.map(
          ({ id, icon, iconBg, iconColor, title, value, sub }) => (
            <div
              key={id}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: iconBg }}
                >
                  {React.cloneElement(icon, { color: iconColor, size: 24 })}
                </div>
                <p className="statcardTitle">{title}</p>
              </div>
              <p className="statcardNumber">{value}</p>
              <p className="statcardSubTitle">{sub}</p>
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-1">
          <BankDetails />
        </div>
        <div className="md:col-span-2">
          <RecentTransactions
            recentTransactions={recentTransactions}
            onExport={exportToCSV}
            loading={loading}
          />
        </div>
      </div>

      <BalanceBreakdown />
    </div>
  );
};

export default Page;
