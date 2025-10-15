"use client";
import {
  BoxSelect,
  ChevronDown,
  CreditCard,
  Plus,
  Search,
  Users,
  Wallet,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import CardModal from "@/components/modals/CardModal";
import CardFlow from "@/components/new_card_creation/CardFlow";
import DateRangePicker from "@/components/DatePicker";
import { cardServices } from "@/services/cardServices";
import { useSelector } from "react-redux";
import { teamServices } from "@/services/teamServices";

const cardColors = [
  { bgColor: "#4e4f2eff", textColor: "white" },
  { bgColor: "#1d2c91ff", textColor: "white" },
  { bgColor: "#13aa64ff", textColor: "white" },
  { bgColor: "#8B4513", textColor: "white" },
  { bgColor: "#2F4F4F", textColor: "white" },
  { bgColor: "#800020", textColor: "white" },
];

const Page = () => {
  const [showCardFlow, setShowCardFlow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cards, setCards] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeSmallData, setEmployeeSmallData] = useState([]);
  console.log(user);
  console.log("dropdown state", activeDropdown, setActiveDropdown);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const formatCardData = (apiCards) => {
    if (!apiCards || !Array.isArray(apiCards)) return [];

    return apiCards.map((card, index) => {
      const colorIndex = index % cardColors.length;
      return {
        id: card.id || card.cardId || index,
        name: card.cardName || card.name || `Card ${index + 1}`,
        number:
          card.cardNumber ||
          card.number ||
          `**** **** **** ${String(index + 1).padStart(4, "0")}`,
        person:
          card.cardHolder || card.holderName || card.person || "Team Lead",
        monthlyLimit: card.monthlyLimit || card.limit || "$5000",
        spent: card.spent || card.amountSpent || "$2000",
        balance: card.balance || card.currentBalance || "$3000",
        status: card.status || "Active",
        bgColor: card.bgColor || cardColors[colorIndex].bgColor,
        textColor: card.textColor || cardColors[colorIndex].textColor,
        // Include raw API data for modal
        rawData: card,
      };
    });
  };

  // Fetch all cards
  const fetchAllCards = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await cardServices.getAllCards({ token });
      console.log("API Response:", response);

      // Handle different response structures

      let cardsData = response.cards;
      const formattedCards = formatCardData(cardsData);
      console.log("Formatted cards:", formattedCards);
      setCards(formattedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      // Fallback to sample data if API fails
    } finally {
      setLoading(false);
    }
  };
  const getAllEmployees = async () => {
    if (!token) return;
    setLoadingEmployees(true);
    try {
      const data = await teamServices.getAllEmployees({ token });
      setEmployeeData(data.data.Employee || []);
      const smallData = data.data.Employee.map((emp) => ({
        id: emp.id,
        name: emp.fullName,
        jobTitle: emp.jobTitle,
        department: emp.department,
      }));
      setEmployeeSmallData(smallData);
    } catch (e) {
      console.error("Error fetching employees:", e);
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllCards();
      getAllEmployees();
    }
  }, [token]);

  // Inside Page component, after fetching all cards and companyData

  // Compute dynamic stats
  // Compute dynamic stats from cards array
  const totalCardsCreated = cards.length;
  const activeCardsCount = cards.filter(
    (card) => card.status === "Active"
  ).length;
  const frozenCardsCount = cards.filter(
    (card) => card.status === "Frozen" || card.status === "Inactive"
  ).length;

  // Calculate total wallet balance from card funding
  const walletBalance = cards.reduce((sum, card) => {
    const funding = card.rawData?.CardFunding || 0;
    return sum + funding;
  }, 0);

  // Prepare stat card data dynamically
  const cardDetails = [
    {
      id: 1,
      title: "Total cards created",
      value: totalCardsCreated.toString(),
      icon: <BoxSelect />,
      iconColor: "#035638",
      sub: "Total cards in the system",
    },
    {
      id: 2,
      title: "Active Cards",
      value: activeCardsCount.toString(),
      icon: <CreditCard />,
      iconColor: "#B91C1C",
      sub: "Currently active cards",
    },
    {
      id: 3,
      title: "Frozen Cards",
      value: frozenCardsCount.toString(),
      icon: <Users />,
      iconColor: "#1E40AF",
      sub: "Cards blocked or inactive",
    },
    {
      id: 4,
      title: "Wallet Balance",
      value: `₦${walletBalance.toLocaleString()}`,
      icon: <Wallet />,
      iconColor: "#065F46",
      sub: "Sum of all card funding",
    },
  ];

  const handleFundCard = async (cardId, amount) => {
    console.log("token", token);
    if (!token) return;
    try {
      await cardServices.fundCard({
        token,

        payload: { amount: amount, cardId: cardId, companyId: user?.companyId },
      });
      fetchAllCards(); // Refresh cards
    } catch (error) {
      alert(error?.response?.data?.message || "Error funding card");
      console.error("Error funding card:", error);
    }
  };

  const handleFreezeCard = async (cardId, currentStatus) => {
    if (!token) return;
    try {
      const action = currentStatus === "Active" ? "block" : "unblock";
      await cardServices.blockUnlockCard({
        token,
        id: cardId,
        action,
      });
      fetchAllCards(); // Refresh cards
    } catch (error) {
      console.error("Error updating card status:", error);
    }
  };

  const handleEditLimit = async (cardId, newLimits) => {
    if (!token) return;
    try {
      await cardServices.editCardLimit({
        token,
        id: cardId,
        payload: newLimits,
      });
      fetchAllCards(); // Refresh cards
    } catch (error) {
      console.error("Error editing card limits:", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!token) return;
    try {
      await cardServices.deleteCard({
        token,
        id: cardId,
      });
      fetchAllCards(); // Refresh cards
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleViewTransactionHistory = async (cardId) => {
    if (!token) return;
    try {
      const response = await cardServices.transactionHistoryByCard({
        token,
        id: cardId,
      });
      console.log("Transaction history:", response.data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  const handleCardCreated = () => {
    setShowCardFlow(false);
    fetchAllCards();
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      card.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Card Management</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
        <div className="rounded-2xl p-2 flex items-center gap-2">
          <DateRangePicker />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {cardDetails.map(({ id, icon, iconColor, title, value, sub }) => (
          <div
            key={id}
            className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-start gap-4"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="rounded-full flex items-center justify-center">
                {React.cloneElement(icon, { color: iconColor, size: 24 })}
              </div>
              <div>
                <p className="statcardTitle">{title}</p>
              </div>
            </div>
            <p className="statcardNumber">{value}</p>
            <p className="statcardSubTitle">{sub}</p>
          </div>
        ))}
      </div>

      {/* Active Cards Section */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="pageTitle">Active Cards</p>
            <p className="pageSubTitle mt-2">
              Manage virtual business cards and spending limits
            </p>
          </div>
          <div
            className="border border-black text-white bg-[#035638] flex p-2 w-[130px] text-[12px] justify-center items-center gap-1 rounded-4xl mt-4 cursor-pointer hover:bg-[#035638] hover:text-white transition duration-300 ease-in-out"
            onClick={() => setShowCardFlow(true)}
          >
            <Plus size={12} />
            <p>Add new card</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <div className="gap-2 border border-gray-300 flex items-center px-4 text-sm rounded-3xl py-1">
            <input
              type="text"
              className="outline-none"
              placeholder="Search card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} />
          </div>
          <div className="border border-gray-300 flex items-center px-2 rounded-3xl py-1">
            <select
              className="px-1 text-sm outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Frozen">Frozen</option>
              <option value="Expired">Expired</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Cards Grid - FIXED: using filteredCards instead of cards */}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p>Loading cards...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-500">
              {cards.length === 0
                ? "No cards found"
                : "No cards match your search criteria"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            {filteredCards.map(
              (card, idx) => (
                console.log("Rendering card:", card),
                (
                  <Card
                    key={card.id || idx}
                    {...card}
                    onViewDetails={() => setSelectedCard(card)}
                    onFundCard={handleFundCard}
                    onFreezeCard={handleFreezeCard}
                    onEditLimit={handleEditLimit}
                    onDeleteCard={handleDeleteCard}
                    onViewTransactions={handleViewTransactionHistory}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )
              )
            )}
          </div>
        )}
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onFundCard={handleFundCard}
          onFreezeCard={handleFreezeCard}
          onEditLimit={handleEditLimit}
        />
      )}

      {showCardFlow && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="rounded-2xl shadow-lg w-full max-w-lg bg-white relative">
            <button
              onClick={() => setShowCardFlow(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black bg-gray-300 rounded-full p-1"
            >
              <X size={14} />
            </button>
            <CardFlow
              onCardCreated={handleCardCreated}
              token={token}
              employees={employeeSmallData} // ✅ pass small employee data
              loadingEmployees={loadingEmployees} // ✅ pass loading state
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;