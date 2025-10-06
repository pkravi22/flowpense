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
import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import CardModal from "@/components/modals/CardModal";
import CardFlow from "@/components/new_card_creation/CardFlow";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCards } from "@/redux/slices/cardSlice";
import { useRouter } from "next/navigation";
import DateRangePicker from "@/components/DatePicker";

const cardDetails = [
  {
    id: 1,
    title: "Total cards created",
    value: "20",
    icon: <BoxSelect />,
    iconBg: "#E5EE7D",
    iconColor: "#035638",
    sub: "10 % increase from last month",
  },
  {
    id: 2,
    title: "Active Cards",
    value: "15",
    icon: <CreditCard />,
    iconBg: "#FFD6D6",
    iconColor: "#B91C1C",
    sub: "15 % increase from last month",
  },
  {
    id: 3,
    title: "Frozen cards",
    value: "10",
    icon: <Users />,
    iconBg: "#E0E7FF",
    iconColor: "#1E40AF",
    sub: " 8 new members added this month",
  },
  {
    id: 4,
    title: "Wallet Balance",
    value: "$8,250.00",
    icon: <Wallet />,
    iconBg: "#D1FAE5",
    iconColor: "#065F46",
    sub: "4 % increase from last month",
  },
];

const Page = () => {
  const [showCardFlow, setShowCardFlow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { allCards, loading, error } = useSelector((state) => state.cards);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchAllCards({ token }));
    } else {
      console.error("No authentication token found - redirecting to login");
      router.push("/login");
    }
  }, [dispatch, router]);
  return (
    <div>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Card Management</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
        <div>
          <div className="border border-gray-300 rounded-2xl p-2 flex items-center gap-2">
            <div className="">
              <DateRangePicker />
            </div>
            <span>
              <ChevronDown />
            </span>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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

      {/* Active Cards Section */}
      <div className="mt-6 bg-white p-4 rounded-2xl shadow-md">
        <div className="flex items-center justify-between ">
          <div>
            <p className="pageTitle">Active Cards</p>
            <p className="pageSubTitle mt-2">
              Manage virtual business cards and spending limits
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div
              className="border border-black text-white bg-[#035638] flex p-2 w-[130px] text-[12px] justify-center items-center gap-1 rounded-4xl mt-4 cursor-pointer hover:bg-[#035638] hover:text-white transition duration-300 ease-in-out"
              onClick={() => setShowCardFlow(true)}
            >
              <Plus size={12} />
              <p>Add new card</p>
            </div>
          </div>
        </div>

        {/* search + status */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <div className="gap-2 border border-gray-300 flex items-center px-4 text-sm outline-none rounded-3xl py-1">
            <input
              type="text"
              className="outline-none"
              placeholder="Search card "
            />
            <span>
              <Search size={16} />
            </span>
          </div>
          <div className="border border-gray-300 flex items-center px-2 rounded-3xl py-1">
            <select className="px-1 text-sm outline-none">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
          {[
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
              name: "Engineering ",
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
          ].map((card, idx) => (
            <div key={idx} onClick={() => handleCardClick(card)}>
              <Card
                {...card}
                onMenuClick={(e) => {
                  e.stopPropagation(); // ✅ Prevent opening card modal
                  setSelectedCard(null); // Ensure card detail modal doesn’t open
                  setFunctionModalCard(card); // Your function modal state
                  setShowFunctionModal(true); // open function modal
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}

      {showCardFlow && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
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
