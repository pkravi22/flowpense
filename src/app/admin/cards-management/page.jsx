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
import React, { useState } from "react";
import Card from "../../../components/Card";
import CardModal from "@/components/modals/CardModal";
import CardFlow from "@/components/new_card_creation/CardFlow";
import DateRangePicker from "@/components/DatePicker";

// Stats card data
const cardDetails = [
  {
    id: 1,
    title: "Total cards created",
    value: "20",
    icon: <BoxSelect />,
    iconColor: "#035638",
    sub: "10 % increase from last month",
  },
  {
    id: 2,
    title: "Active Cards",
    value: "15",
    icon: <CreditCard />,
    iconColor: "#B91C1C",
    sub: "15 % increase from last month",
  },
  {
    id: 3,
    title: "Frozen cards",
    value: "10",
    icon: <Users />,
    iconColor: "#1E40AF",
    sub: "8 new members added this month",
  },
  {
    id: 4,
    title: "Wallet Balance",
    value: "$8,250.00",
    icon: <Wallet />,
    iconColor: "#065F46",
    sub: "4 % increase from last month",
  },
];

// Hardcoded cards array
const cards = [
  {
    name: "Engineering",
    person: "Pramendra Singh",
    number: "3432 **** **** 1234",
    bgColor: "#4e4f2eff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Active",
  },
  {
    name: "Engineering Team",
    person: "Pramendra Singh",
    number: "7865 **** **** 1234",
    bgColor: "#1d2c91ff",
    textColor: "white",
    monthlyLimit: "$10000",
    spent: "$2000",
    balance: "$30000",
    status: "Active",
  },
  {
    name: "Engineering Team Card",
    person: "Pramendra Singh",
    number: "7865 **** **** 1234",
    bgColor: "#13aa64ff",
    textColor: "white",
    monthlyLimit: "$3000",
    spent: "$2000",
    balance: "$30000",
    status: "Frozen",
  },
  {
    name: "Sales Team Card",
    person: "Adebayo",
    number: "7865 **** **** 1234",
    bgColor: "red",
    textColor: "white",
    monthlyLimit: "$6000",
    spent: "$2000",
    balance: "$30000",
    status: "Inactive",
  },
];

const Page = () => {
  const [showCardFlow, setShowCardFlow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter cards based on search & status
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || card.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Card Management</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
        <div className=" rounded-2xl p-2 flex items-center gap-2">
          <DateRangePicker />
        </div>
      </div>

      {/* Stats Cards */}
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
          {filteredCards.map((card, idx) => (
            <Card
              key={idx}
              {...card}
              onViewDetails={() => setSelectedCard(card)}
            />
          ))}
        </div>
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

      {/* Card Flow Modal */}
      {showCardFlow && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="rounded-2xl shadow-lg w-full max-w-lg bg-white relative">
            <button
              onClick={() => setShowCardFlow(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black bg-gray-300 rounded-full p-1"
            >
              <X size={14} />
            </button>
            <CardFlow />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
