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

const Card = ({ rawData, bgColor, textColor }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showEditLimitModal, setShowEditLimitModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [showCardModal, setShowCardModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [newLimits, setNewLimits] = useState({
    dailySpendLimit: "",
    weeklySpendLimit: "",
    monthlyLimit: "",
    perTransactionLimit: "",
  });

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log("token in card", token);
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
      : status === "Frozen"
      ? "text-yellow-400"
      : status === "Expired"
      ? "text-red-400"
      : "text-gray-400";

  const handleThreeDots = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleFundCard = async () => {
    if (!fundAmount || !id) return alert("Enter a valid amount");
    try {
      await cardServices.fundCard({
        token,
        payload: {
          amount: parseFloat(fundAmount),
          cardId: id,
          companyId: user?.companyId,
        },
      });
      alert("Card funded successfully!");
      fetchAllCards && fetchAllCards();
      setShowFundModal(false);
      setFundAmount("");
    } catch (error) {
      alert(error?.response?.data?.message || "Error funding card");
      console.error(error);
    }
  };

  const handleEditLimits = async () => {
    if (!id) return;
    try {
      await cardServices.editCardLimit({
        token,
        id,
        payload: newLimits,
      });
      alert("Card limits updated successfully!");
      fetchAllCards && fetchAllCards();
      setShowEditLimitModal(false);
      setNewLimits({
        dailyLimit: "",
        monthlyLimit: "",
        perTransactionLimit: "",
      });
    } catch (error) {
      console.error("Error editing limits:", error);
    }
  };

  const handleFreezeToggle = async () => {
    console.log("freeze toggle called", token, "id", id);
    if (!token) return;
    const action = status === "Active" ? "frozen" : "activate";
    try {
      alert("lets freeze");
      await cardServices.blockUnlockCard({ token, id, action });
      alert(`Card ${action === "block" ? "frozen" : "unfrozen"} successfully!`);
      fetchAllCards && fetchAllCards();
    } catch (error) {
      console.error("Error toggling card status:", error);
    }
  };

  const handleDeleteCard = async () => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      await cardServices.deleteCard({ token, id });
      alert("Card deleted successfully!");
      fetchAllCards && fetchAllCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleViewTransactions = async () => {
    try {
      const response = await cardServices.transactionHistoryByCard({
        token,
        id,
      });
      console.log("Transaction History:", response.data);
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const total = parseFloat(MonthlyLimit) || 0;
  const spent = total > 0 ? total * 0.3 : 0;
  const percentage = total > 0 ? (spent / total) * 100 : 0;

  return (
    <>
      {/* Card Modal - Fixed to use showCardModal state */}
      {showCardModal && (
        <CardModal
          card={rawData} // Changed from cardData to card to match typical prop name
          onClose={() => setShowCardModal(false)}
          onFundCard={handleFundCard}
          onFreezeCard={handleFreezeToggle}
          onEditLimit={handleEditLimits}
          onDeleteCard={handleDeleteCard}
          onViewTransactions={handleViewTransactions}
          transactions={transactions}
        />
      )}

      <div className="w-full sm:w-[300px] h-[180px] cursor-pointer">
        {/* --- Fund Modal --- */}
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
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFundModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFundCard}
                  className="flex-1 bg-[#035638] text-white py-2 rounded"
                >
                  Fund Card
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditLimitModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">Edit Card Limits</h3>

              <input
                type="number"
                value={newLimits.dailySpendLimit}
                onChange={(e) =>
                  setNewLimits((prev) => ({
                    ...prev,
                    dailySpendLimit: e.target.value,
                  }))
                }
                placeholder="Daily Spend Limit"
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="number"
                value={newLimits.weeklySpendLimit}
                onChange={(e) =>
                  setNewLimits((prev) => ({
                    ...prev,
                    weeklySpendLimit: e.target.value,
                  }))
                }
                placeholder="Weekly Spend Limit"
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="number"
                value={newLimits.monthlyLimit}
                onChange={(e) =>
                  setNewLimits((prev) => ({
                    ...prev,
                    monthlyLimit: e.target.value,
                  }))
                }
                placeholder="Monthly Limit"
                className="w-full border p-2 rounded mb-2"
              />

              <input
                type="number"
                value={newLimits.perTransactionLimit}
                onChange={(e) =>
                  setNewLimits((prev) => ({
                    ...prev,
                    perTransactionLimit: e.target.value,
                  }))
                }
                placeholder="Per Transaction Limit"
                className="w-full border p-2 rounded mb-4"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditLimitModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditLimits}
                  className="flex-1 bg-[#035638] text-white py-2 rounded"
                >
                  Update Limits
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
            {dropdownOpen && (
              <div className="absolute right-0 top-6 w-48 bg-white shadow-lg rounded-lg border p-2 z-50">
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={() => {
                    setShowCardModal(true);
                    setDropdownOpen(false);
                  }}
                >
                  <Eye size={16} /> View Details
                </button>

                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={() => {
                    setShowFundModal(true);
                    setDropdownOpen(false);
                  }}
                >
                  <BanknoteArrowUp size={16} /> Fund Card
                </button>

                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={() => {
                    handleFreezeToggle();
                    setDropdownOpen(false);
                  }}
                >
                  <Snowflake size={16} />
                  {status === "Active" ? "Freeze" : "Unfreeze"} Card
                </button>

                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={() => {
                    setShowEditLimitModal(true);
                    setDropdownOpen(false);
                  }}
                >
                  <Settings size={16} /> Edit Limit
                </button>

                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={() => {
                    handleViewTransactions();
                    setShowCardModal(true);
                    setDropdownOpen(false);
                  }}
                >
                  <History size={16} /> Transaction History
                </button>

                <button
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-red-600 text-sm rounded-md"
                  onClick={() => {
                    handleDeleteCard();
                    setDropdownOpen(false);
                  }}
                >
                  <Trash2 size={16} /> Delete Card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Card Body --- */}
        <div
          className="w-full h-[160px] rounded-2xl p-3 flex flex-col gap-2"
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