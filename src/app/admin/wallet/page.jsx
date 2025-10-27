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

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    initial: true,
    ledger: false,
    banks: false,
    userBanks: false,
    payment: false,
  });
  const [errorStates, setErrorStates] = useState({
    ledger: null,
    banks: null,
    userBanks: null,
    payment: null,
  });
  const router = useRouter();

  const [recentTransactions, setReecentTransactions] = useState([]);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [allBanks, setAllBanks] = useState([]);
  const [userBankAccounts, setUserBankAccounts] = useState([]);
const [accountDetailModalOpen, setAccountDetailModalOpen] = useState(false);
const [accountDetail, setAccountDetail] = useState(null);
const [sucessModal, setSucessModal] = useState(null);
const [paymentDetail, setPaymentDetail] = useState(null);
const [formData, setFormData] = useState({
  companyId: user?.companyId,
  amount: "",
});

const { company } = useSelector((state) => state.company);
const dispatch = useDispatch();

const fundWallet = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
const closeSuccessPayment = () => {
  setSucessModal(false);
};
const handleAddFunds = async () => {
  if (!user || !token) {
    toast.error("User not authenticated");
    return;
  }

  setLoadingStates((prev) => ({ ...prev, payment: true }));

  try {
    const payload = {
      companyId: user.companyId,
      amount: formData.amount,
      currency: formData.currency || "NGN",
    };

    const response = await bankServices.depositToBank({ payload, token });
    console.log("Deposit response:", response.data);

    // ✅ Check success
    if (response.data?.success) {
      // ✅ Show toast
      toast.success(response.data.message || "Deposit successful");

      // ✅ Set payment detail for modal
      setPaymentDetail(response.data.pagaResponse);

      // ✅ Close previous modals and open success modal
      setIsModalOpen(false);
      setAccountDetailModalOpen(false);
      setSucessModal(true);

      // ✅ Refresh wallet ledger
      await fetchWalletLedger();
    } else {
      toast.error(response.data?.message || "Deposit failed");
    }
  } catch (error) {
    console.error("Error adding funds:", error);
    toast.error("Something went wrong while depositing to bank");
  } finally {
    setLoadingStates((prev) => ({ ...prev, payment: false }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.amount) {
    toast.error("Please fill all fields");
    return;
  }

  createPaymentId();

  // setLoadingStates((prev) => ({ ...prev, payment: true }));
};

const fetchWalletLedger = async () => {
  if (!user || !token) return;
  setLoadingStates((prev) => ({ ...prev, ledger: true }));
  setErrorStates((prev) => ({ ...prev, ledger: null }));

  try {
    const response = await companyServices.getWalletLedger({
      companyId: user.companyId,
      token,
    });
    setReecentTransactions(response.ledger || []);
  } catch (error) {
    console.error("Error fetching wallet ledger:", error);
    setErrorStates((prev) => ({ ...prev, ledger: error.message }));
    toast.error("Failed to load transactions");
  } finally {
    setLoadingStates((prev) => ({ ...prev, ledger: false }));
  }
};

const getAllBanks = async () => {
  if (!user || !token) return;
  setLoadingStates((prev) => ({ ...prev, banks: true }));
  setErrorStates((prev) => ({ ...prev, banks: null }));

  try {
    const response = await bankServices.getAllBanks();
    setAllBanks(response.data || []);
  } catch (error) {
    console.error("Error fetching banks:", error);
    setErrorStates((prev) => ({ ...prev, banks: error.message }));
  } finally {
    setLoadingStates((prev) => ({ ...prev, banks: false }));
  }
};

const createPaymentId = async () => {
  if (!user || !token) return;

  setLoadingStates((prev) => ({ ...prev, payment: true }));

  try {
    const payload = {
      companyId: user.companyId,
      email: user.email,
      phone: user.phone || "",
    };

    const response = await companyServices.createPayment({ payload, token });
    const data = response?.data;
    console.log("response", response);
    if (data?.success) {
      toast.success("Payment ID created successfully");
      setAccountDetail(data.data);
      setIsModalOpen(false);
      setAccountDetailModalOpen(true);
      return;
    }

    const errorMsg =
      data?.error?.statusMessage || "Failed to create payment ID";
    toast.error(errorMsg);
    console.error("Payment Error:", data.error);
  } catch (error) {
    const message =
      error.response?.data?.error?.statusMessage ||
      error.message ||
      "Something went wrong";
    toast.error(message);
    console.error("Exception:", error);
  } finally {
    setLoadingStates((prev) => ({ ...prev, payment: false }));
  }
};



// const getUSerBankAccounts = async () => {
//   if (!user || !token) return;
//   setLoadingStates((prev) => ({ ...prev, userBanks: true }));
//   setErrorStates((prev) => ({ ...prev, userBanks: null }));

//   try {
//     const response = await bankServices.getUserBankAccount({ token });
//     console.log(":user bank", response);
//     setUserBankAccounts(response.bank || []);
//   } catch (error) {
//     console.error("Error fetching user bank accounts:", error);
//     setErrorStates((prev) => ({ ...prev, userBanks: error.message }));
//   } finally {
//     setLoadingStates((prev) => ({ ...prev, userBanks: false }));
//   }
// };

const loadInitialData = async () => {
  if (!user || !token) return;

  setLoadingStates((prev) => ({ ...prev, initial: true }));

  try {
    await Promise.allSettled([
      fetchWalletLedger(),
      getAllBanks(),
      // getUSerBankAccounts(),
      // createPaymentId(),
    ]);
  } catch (error) {
    console.error("Error loading initial data:", error);
    toast.error("Failed to load some data");
  } finally {
    setLoadingStates((prev) => ({ ...prev, initial: false }));
  }
};

const retryFailedRequests = () => {
  const promises = [];

  if (errorStates.ledger) {
    promises.push(fetchWalletLedger());
  }
  if (errorStates.banks) {
    promises.push(getAllBanks());
  }
  if (errorStates.userBanks) {
    promises.push(getUSerBankAccounts());
  }
  if (errorStates.payment) {
    promises.push(createPaymentId());
  }

  if (promises.length > 0) {
    Promise.allSettled(promises).then(() => {
      toast.info("Retried failed requests");
    });
  }
};

useEffect(() => {
  if (user && token) {
    loadInitialData();
  }
}, [user, token]);

const closeaccountDetail = () => {
  setAccountDetailModalOpen(false);
};

const sortedTransactions = [...recentTransactions].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

const totalAvailable =
  sortedTransactions.length > 0 ? sortedTransactions[0].balanceAfter : 0;

const totalAllocated = recentTransactions
  .filter((tx) => tx.txType === "card_funding")
  .reduce((sum, tx) => sum + (tx.amount || 0), 0);

const totalLeftInWallet = totalAvailable;

const totalBalance = totalAvailable + totalAllocated;

const cardDetails = [
  {
    id: 1,
    title: "Total Balance",
    value: `₦${totalBalance.toLocaleString()}`,
    icon: <Wallet />,
    iconBg: "#E6FFFA",
    iconColor: "#035638",
    sub: "Available + Allocated Funds",
    loading: loadingStates.initial || loadingStates.ledger,
  },
  {
    id: 2,
    title: "Available Balance",
    value: `₦${totalLeftInWallet.toLocaleString()}`,
    icon: <CreditCard />,
    iconBg: "#FEE2E2",
    iconColor: "#B91C1C",
    sub: "Funds available in wallet",
    loading: loadingStates.initial,
  },
  {
    id: 3,
    title: "Funds Allocated to Cards",
    value: `₦${totalAllocated.toLocaleString()}`,
    icon: <Users />,
    iconBg: "#E0E7FF",
    iconColor: "#1E40AF",
    sub: "Total amount transferred to cards",
    loading: loadingStates.initial || loadingStates.ledger,
  },
];

const exportToCSV = () => {
  if (!recentTransactions || recentTransactions.length === 0) {
    toast.error("No transactions available to export!");
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

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
    "\n"
  );

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `wallet_transactions_${Date.now()}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};

const CardSkeleton = () => (
  <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-start justify-start gap-4 animate-pulse">
    <div className="flex items-center gap-4 w-full">
      <div className="rounded-full w-12 h-12 bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-200 rounded w-full"></div>
  </div>
);

return (
  <div className="p-0 md:p-4 overflow-visible bg-gray-100">
    {/* Error Retry Banner */}
    {/* {Object.values(errorStates).some((error) => error) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-red-600 text-sm">
              Some data failed to load.
            </span>
          </div>
          <button
            onClick={retryFailedRequests}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )} */}

    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-4">
      <div className="flex flex-col justify-start sm:ml-0">
        <h1 className="pageTitle">Wallet</h1>
        <p className="pageSubTitle mt-2">
          Manage organization funds and transfer to cards
        </p>
      </div>
      <div className="">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            className="flex gap-1 items-center px-4 py-2 cursor-pointer rounded-[10px] border hover:bg-gray-50 transition-colors"
            onClick={exportToCSV}
            disabled={loadingStates.ledger || recentTransactions.length === 0}
          >
            <Download className="inline md:mr-2" size={16} />
            <span className="text-sm">Export Statement</span>
          </button>

          {/* <button
            className="flex items-center px-2 cursor-pointer rounded-[10px] border p-1 hover:bg-gray-50 transition-colors"
            onClick={() => toast.error("Feature coming soon!")}
          >
            <ArrowUpRight className="inline md:mr-2" size={16} />
            <span className="text-sm">Transfer Funds</span>
          </button> */}

          <button
            className="flex items-center px-4 py-2 rounded-[10px] cursor-pointer border p-1 bg-[#035638] text-white hover:bg-[#02422a] transition-colors"
            onClick={fundWallet}
            disabled={loadingStates.payment}
          >
            <Plus className="inline md:mr-2" size={16} />
            <span className="text-sm">Payment To Admin bank </span>
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {loadingStates.initial
        ? Array(3)
            .fill(0)
            .map((_, index) => <CardSkeleton key={index} />)
        : cardDetails.map(
            ({ id, icon, iconBg, title, value, iconColor, sub, loading }) => (
              <div
                key={id}
                className="bg-white p-4 rounded-2xl  flex flex-col items-start justify-start gap-4 transition-all duration-200 hover:shadow-lg"
              >
                {loading ? (
                  <div className="animate-pulse w-full">
                    <div className="flex items-center gap-4 w-full">
                      <div className="rounded-full w-12 h-12 bg-gray-200"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mt-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <div className="flex items-center  gap-4 w-full">
                        <div
                          className="rounded-full flex items-center  p-2"
                          style={{ backgroundColor: iconBg }}
                        >
                          {React.cloneElement(icon, {
                            color: iconColor,
                            size: 24,
                          })}
                        </div>
                        <div className="flex flex-col justify-between h-full">
                          <p className="statcardTitle">{title}</p>
                        </div>
                      </div>
                    </div>
                    <p className="statcardNumber">{value}</p>
                    <p className="statcardSubTitle">{sub}</p>
                  </>
                )}
              </div>
            )
          )}
    </div>

    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-2">
          <RecentTransactions
            recentTransactions={recentTransactions}
            onExport={exportToCSV}
            loading={loadingStates.ledger}
            error={errorStates.ledger}
            onRetry={fetchWalletLedger}
          />
        </div>
      </div>
      <div>
        <BalanceBreakdown
          loading={loadingStates.initial}
          totalBalance={totalBalance}
          availableBalance={totalLeftInWallet}
          allocatedToCards={totalAllocated}
          recentTransactions={recentTransactions}
        />
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            disabled={loadingStates.payment}
          >
            <X size={20} />
          </button>

          <div className="mb-4">
            <h2 className="text-[24px] text-[#035638]">
              Transfer money to Admin Bank
            </h2>
            <p className="text-[#838794] text-[16px]">
              Transfer funds from wallet to admin bank account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter Amount"
                className="w-full border border-gray-200 p-2 rounded"
                disabled={loadingStates.payment}
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 flex-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={closeModal}
                disabled={loadingStates.payment}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 flex flex-1 items-center justify-center gap-2 rounded-full bg-[#035638] text-white hover:bg-[#02422a] transition-colors disabled:opacity-50"
                disabled={loadingStates.payment}
              >
                {loadingStates.payment ? (
                  "Processing..."
                ) : (
                  <>
                    <PlusIcon size={16} /> Add Funds
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    {accountDetailModalOpen && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
          <button
            onClick={closeaccountDetail}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            disabled={loadingStates.payment}
          >
            <X size={20} />
          </button>

          <div className="mb-4">
            <h2 className="text-[24px] text-[#035638]">Account Details</h2>
            <p className="text-[#838794] text-[16px]">
              Details Of Account to transfer funds from
            </p>
          </div>

          <div className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-lg flex justify-between font-semibold text-[#035638]">
                Transferable Amount :
                <span className="font-bold">₦{formData.amount}</span>
              </p>
              <p className="text-md flex justify-between text-[#035638]">
                Bank Name: <span>{accountDetail?.bankName}</span>
              </p>
              <p className="text-md flex justify-between text-[#035638]">
                Paga Charges: <span>₦43</span>
              </p>
              <p className="text-[#838794] flex justify-between text-[16px]">
                Account Number: <span>{accountDetail?.accountNumber}</span>
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 flex-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={closeaccountDetail}
                disabled={loadingStates.payment}
              >
                Cancel
              </button>
              <button
                onClick={handleAddFunds}
                className="px-4 py-2 flex flex-1 items-center justify-center gap-2 rounded-full bg-[#035638] text-white hover:bg-[#02422a] transition-colors disabled:opacity-50"
                disabled={loadingStates.payment}
              >
                {loadingStates.payment ? (
                  "Processing..."
                ) : (
                  <>
                    <PlusIcon size={16} /> Transfer Money
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    {sucessModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
          <button
            onClick={closeSuccessPayment}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <div className="mb-4">
            <h2 className="text-[24px] text-[#035638]">Payment Detail</h2>
            <p className="text-[#838794] text-[16px]">
              Details of payment from Wallet to bank
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium text-[#035638] ">
              {paymentDetail?.message}
            </h1>
            <p className="text-md flex justify-between text-gray-400">
              Reference Number:- <span>{paymentDetail?.referenceNumber}</span>
            </p>
            <p className="text-md flex justify-between text-gray-400">
              Transaction Id:- <span>{paymentDetail?.transactionId}</span>
            </p>
            <p className="text-md flex justify-between text-gray-400">
              Account Holder name:-{" "}
              <span>{paymentDetail?.destinationAccountHolderNameAtBank}</span>
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Page;