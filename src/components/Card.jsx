import {
  Ellipsis,
  Trash2,
  Eye,
  Snowflake,
  Settings,
  BanknoteArrowUp,
  History,
} from "lucide-react";
import React, { useState } from "react";
import { cardServices } from "@/services/cardServices";
import { useSelector } from "react-redux";
import { fetchAllCards } from "@/redux/slices/cardSlice";
import CardModal from "@/components/modals/CardModal";
import { toast } from "react-toastify";

const Card = ({
  rawData,
  bgColor,
  textColor,
  activeDropdown,
  setActiveDropdown,
}) => {
  const [showFundModal, setShowFundModal] = useState(false);
  const [showEditLimitModal, setShowEditLimitModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [fundAmount, setFundAmount] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Global loading state
  const [newLimits, setNewLimits] = useState({
    dailySpendLimit: "",
    weeklySpendLimit: "",
    monthlyLimit: "",
    perTransactionLimit: "",
  });

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const {
    id,
    Approver,
    CardFunding,
    CardName,
    CardNumber,
    MonthlyLimit,
    status,
  } = rawData || {};

  const statusColor =
    status === "Active"
      ? "text-green-400"
      : status === "frozen"
      ? "text-yellow-400"
      : status === "Expired"
      ? "text-red-400"
      : "text-gray-400";

  // 🔹 Dropdown toggle
  const handleThreeDots = (e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // 🔹 Fund Card
  const handleFundCard = async () => {
    if (!fundAmount || !id) return alert("Enter a valid amount");
    setLoading(true);
    try {
      await cardServices.fundCard({
        token,
        payload: {
          amount: parseFloat(fundAmount),
          cardId: id,
          companyId: user?.companyId,
        },
      });
      toast.success("Card funded successfully!");
      fetchAllCards && fetchAllCards();
      setShowFundModal(false);
      dispatch(fetchAllCards());
      setFundAmount("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error funding card");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit Card Limits
  const handleEditLimits = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await cardServices.editCardLimit({
        token,
        id,
        payload: newLimits,
      });
      toast.success("Card limits updated successfully!");
      fetchAllCards && fetchAllCards();
      setShowEditLimitModal(false);
      dispatch(fetchAllCards());
      setNewLimits({
        dailySpendLimit: "",
        weeklySpendLimit: "",
        monthlyLimit: "",
        perTransactionLimit: "",
      });
    } catch (error) {
      console.error("Error editing limits:", error);
      toast.error("Failed to update limits");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Freeze / Unfreeze Card
  const handleFreezeToggle = async () => {
    if (!token) return;
    const action = status === "Active" ? "frozen" : "Active";
    setLoading(true);
    try {
      await cardServices.blockUnlockCard({ token, id, action });
      toast.success(
        `Card ${action === "frozen" ? "frozen" : "unfrozen"} successfully!`
      );
      fetchAllCards && dispatch(fetchAllCards());
    } catch (error) {
      console.error("Error toggling card status:", error);
      toast.error("Failed to update card status");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Card
  const handleDeleteCard = async () => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    setLoading(true);
    try {
      await cardServices.deleteCard({ token, id });
      toast.error("Card deleted successfully!");
      fetchAllCards && dispatch(fetchAllCards());
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 View Transactions
  const handleViewTransactions = async () => {
    setLoading(true);
    try {
      const response = await cardServices.transactionHistoryByCard({
        token,
        id,
      });
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const total = parseFloat(MonthlyLimit) || 0;
  const spent = total > 0 ? total * 0.3 : 0;
  const percentage = total > 0 ? (spent / total) * 100 : 0;

  return (
    <>
      {/* Card Modal */}
      {showCardModal && (
        <CardModal
          card={rawData}
          onClose={() => setShowCardModal(false)}
          onFundCard={handleFundCard}
          onFreezeCard={handleFreezeToggle}
          onEditLimit={handleEditLimits}
          onDeleteCard={handleDeleteCard}
          onViewTransactions={handleViewTransactions}
          transactions={transactions}
          loading={loading} // optional if modal also shows loader
        />
      )}

      {/* 🔹 Global Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-md text-[#035638] font-semibold">
            Processing...
          </div>
        </div>
      )}

      {/* Card UI */}
      <div className="w-full sm:w-[300px] h-[180px] cursor-pointer">
        {/* Fund Modal */}
        {showFundModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Fund Card</h3>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border p-2 rounded mb-4"
                disabled={loading}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFundModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFundCard}
                  className="flex-1 bg-[#035638] text-white py-2 rounded disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Fund Card"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Limit Modal */}
        {showEditLimitModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Edit Card Limits</h3>
              {[
                "dailySpendLimit",
                "weeklySpendLimit",
                "monthlyLimit",
                "perTransactionLimit",
              ].map((key) => (
                <input
                  key={key}
                  type="number"
                  value={newLimits[key]}
                  onChange={(e) =>
                    setNewLimits((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={
                    key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase()) + " (₹)"
                  }
                  className="w-full border p-2 rounded mb-2"
                  disabled={loading}
                />
              ))}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditLimitModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditLimits}
                  className="flex-1 bg-[#035638] text-white py-2 rounded disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Limits"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Card Header --- */}
        <div className="flex justify-between mb-2 px-4 items-center">
          <p className="text-sm font-medium">{CardName}</p>
          <div className="flex items-center gap-2 relative">
            <p className={statusColor}>{status}</p>
            <Ellipsis
              className="bg-gray-200 px-1 py-[.2rem] rounded-3xl cursor-pointer hover:bg-gray-300"
              onClick={handleThreeDots}
            />
            {activeDropdown === id && (
              <div className="absolute right-0 top-6 w-48 bg-white shadow-lg rounded-lg border p-2 z-50">
                {/* Dropdown Options */}
                {[
                  {
                    label: "View Details",
                    icon: Eye,
                    action: () => setShowCardModal(true),
                  },
                  {
                    label: "Fund Card",
                    icon: BanknoteArrowUp,
                    action: () => setShowFundModal(true),
                  },
                  {
                    label: `${
                      status === "Active" ? "Freeze" : "Unfreeze"
                    } Card`,
                    icon: Snowflake,
                    action: handleFreezeToggle,
                  },
                  {
                    label: "Edit Limit",
                    icon: Settings,
                    action: () => setShowEditLimitModal(true),
                  },
                  {
                    label: "Transaction History",
                    icon: History,
                    action: async () => {
                      await handleViewTransactions();
                      setShowCardModal(true);
                    },
                  },
                ].map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveDropdown(null);
                      action();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md disabled:opacity-60"
                    disabled={loading}
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    handleDeleteCard();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-red-600 text-sm rounded-md disabled:opacity-60"
                  disabled={loading}
                >
                  <Trash2 size={16} /> Delete Card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Card Body --- */}
        <div
          className="w-full h-[170px] rounded-2xl p-4 flex flex-col gap-2"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="flex justify-between text-sm text-[#B1CBC1]">
            <p>Team Lead</p>
            <p>Balance</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-[#F7FAD7]">
              {Approver?.[0] || "-"}
            </p>
            <p className="text-lg font-medium">{CardFunding}</p>
          </div>

          <p className="text-2xl font-medium text-[#FCFDF2] my-1">
            {CardNumber}
          </p>

          <div className="w-full">
            <div className="flex justify-between text-xs text-[#B1CBC1]">
              <p>Monthly Limit</p>
              <p>{MonthlyLimit}</p>
            </div>
            <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
              <div
                className="bg-[#CED671] h-[4px] rounded-full"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-[#B1CBC1]">
              <p>Monthly Spent</p>
              <p>{spent}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
