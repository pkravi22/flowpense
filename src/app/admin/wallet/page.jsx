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
import DateRangePicker from "../../../components/DatePicker";
import React, { useEffect, useState } from "react";
import TransactionTable from "../../../components/UserTable";
import BankDetails from "../../../components/walletPages/BankDetails";
import RecentTransactions from "../../../components/walletPages/RecentTransactions";
import BalanceBreakdown from "../../../components/walletPages/BalanceBreakdown";

import { companyServices } from "@/services/companyServices";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { bankServices } from "@/services/bankServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "@/redux/slices/companySlice";
// const cardDetails = [
//   {
//     id: 2,
//     title: "Completed",
//     value: "$15,00,000",
//     icon: <CreditCard />,
//     iconBg: "#FFD6D6",
//     iconColor: "#B91C1C",
//     sub: "15 % increase from last month",
//   },
//   {
//     id: 3,
//     title: "Pending",
//     value: "$45,00,000",
//     icon: <Users />,
//     iconBg: "#E0E7FF",
//     iconColor: "#1E40AF",
//     sub: " 4 % increase from last month",
//   },
//   {
//     id: 4,
//     title: "Pending",
//     value: "$8,250.00",
//     icon: <Wallet />,
//     iconBg: "#D1FAE5",
//     iconColor: "#065F46",
//     sub: "4 % increase from last month",
//   },
// ];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [token, setToken] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [recentTransactions, setReecentTransactions] = useState([]);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bank: "",
    amount: "",
    currency: "",
  });

  const { user, token } = useSelector((state) => state.auth);
  const { company } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  console.log("user in wallet", user);
  const fundWallet = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    if (!formData.bank || !formData.amount || !formData.currency) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user || !token) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        companyId: user.companyId,
        amount: formData.amount,
        currency: formData.currency,
      };
      const response = await bankServices.depositToBank({ payload, token });

      if (response.success) {
        closeModal();
        setFormData({ bank: "", amount: "", method: "" });
        router.push(response.authorization_url);
      } else {
        toast.error("Failed to add funds: " + response.message);
      }
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletLedger = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await companyServices.getWalletLedger({
        companyId: user.companyId,
        token,
      });
      setReecentTransactions(response.ledger || []);

      console.log("Wallet Ledger:", response);
    } catch (error) {
      console.error("Error fetching wallet ledger:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllBanks = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await bankServices.getAllBanks();
      setReecentTransactions(response.ledger || []);

      console.log("Wallet banks:", response);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setLoading(false);
    }
  };
  const createPaymentId = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await companyServices.createPayment({
        companyId: user.companyId,
        email: user.email,
      });
      setReecentTransactions(response.ledger || []);

      console.log("Wallet banks:", response);
    } catch (error) {
      console.error("Error fetching wallet ledger:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("company", company);
  const getUSerBankAccounts = async () => {
    try {
      const response = await bankServices.getUserBankAccount({ token });
      console.log("user bank accounts", response);
    } catch (error) {
      console.error("Error fetching user bank accounts:", error);
    }
  };

  useEffect(() => {
    if (user && token) {
      console.log("lets do ");
      dispatch(fetchCompany({ token, id: user.companyId }));
    }
    fetchWalletLedger();

    getAllBanks();
    getUSerBankAccounts();
    createPaymentId();
  }, [user, token]);

  const totalAvailable = recentTransactions
    .filter((tx) => tx.txType === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalAllocated = recentTransactions
    .filter((tx) => tx.txType === "card_funding")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalLeftInWallet = company ? company.walletBalance : 0;
  const totalBalance = (company ? company.walletBalance : 0) + totalAllocated;

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
      value: `₦${totalLeftInWallet.toLocaleString()}`,
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

  const exportToCSV = () => {
    if (!recentTransactions || recentTransactions.length === 0) {
      toast.error("No transactions available to export!");
      return;
    }

    const totalAvailable = recentTransactions
      .filter((tx) => tx.txType === "credit")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalAllocated = recentTransactions
      .filter((tx) => tx.txType === "card_funding")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const totalBalance = totalAvailable + totalAllocated;

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

    // Format rows
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

    const csvContent = [
      headers.join(","), // header row
      ...rows.map((r) => r.join(",")), // data rows
    ].join("\n");

    // Create Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `wallet_transactions_${Date.now()}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4">
        <div className="flex flex-col justify-start  sm:ml-0">
          <h1 className="pageTitle">Wallet</h1>
          <p className="pageSubTitle mt-2">
            Manage organization funds and transfer to cards
          </p>
        </div>
        <div className="">
          <div className="flex flex-wrap gap-2">
            <button
              className="flex items-center px-2 cursor-pointer rounded-[10px] border p-1"
              onClick={exportToCSV}
            >
              <Download className="inline md:mr-2" size={16} />
              <span className="text-sm">Export Statement</span>
            </button>

            <button
              className="flex items-center px-2 cursor-pointer rounded-[10px] border p-1"
              onClick={() => toast.error("Feature coming soon!")}
            >
              <ArrowUpRight className="inline md:mr-2" size={16} />
              <span className="text-sm">Transfer Funds</span>
            </button>

            <button
              className="flex items-center px-2 rounded-[10px] cursor-pointer border p-1 bg-[#035638] text-white"
              onClick={fundWallet}
            >
              <Plus className="inline md:mr-2" size={16} />
              <span className="text-sm"> Payment To Compnay Admin</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cardDetails.map(
          ({ id, icon, iconBg, title, value, iconColor, sub }) => (
            <div
              key={id}
              className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-start justify-start gap-4"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="rounded-full flex items-center justify-center">
                  {React.cloneElement(icon, { color: iconColor, size: 24 })}
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="statcardTitle">{title}</p>
                </div>
              </div>
              <p className="statcardNumber">{value}</p>
              <p className="statcardSubTitle">{sub}</p>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 mt-4 ">
          <div className="flex-1">
            <BankDetails
              bankModalOpen={bankModalOpen}
              setBankModalOpen={setBankModalOpen}
            />
          </div>
          <div className="flex-2">
            <RecentTransactions
              recentTransactions={recentTransactions}
              onExport={exportToCSV}
              loading={loading}
            />
          </div>
        </div>
        <div>
          <BalanceBreakdown />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <h2 className="text-[24px] text-[#035638]">
                Fund Organization Wallet
              </h2>
              <p className="text-[#838794] text-[16px]">
                Add funds to wallet from your bank account
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Bank
                </label>
                <select
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 p-2 rounded"
                >
                  <option value="">Select Bank Account</option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter Amount"
                  className="w-full border border-gray-200 p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  placeholder="NGN"
                  className="w-full border border-gray-200 p-2 rounded"
                />
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 flex-1 rounded-full bg-gray-200"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 flex flex-1 items-center gap-2 rounded-full bg-[#035638] text-white"
                  disabled={loading}
                >
                  <PlusIcon size={16} /> Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
