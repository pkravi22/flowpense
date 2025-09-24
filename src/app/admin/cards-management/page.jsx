"use client";
import {
  ArrowRight,
  BoxSelect,
  ChevronDown,
  CreditCard,
  Plus,
  Search,
  Users,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";
import Card from "../../../components/Card";
import CardFlow from "../../../components/new_card_creation/CardFlow";
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
const page = () => {
  const [showCardFlow, setShowCardFlow] = useState(false);
  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Card Management</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
        <div>
          <div className="border border-gray-300 rounded-2xl p-2 flex items-center gap-2">
            <span className="text-[#2E2E2E] font-medium">
              Compare To : 4 Jan - 4 Jun, 2025
            </span>
            <span>
              <ChevronDown />
            </span>
          </div>
        </div>
      </div>

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
          <div className=" gap-2 border border-gray-300 flex items-center px-4 text-sm outline-none rounded-3xl  py-1">
            <input
              type="text"
              className="outline-none"
              placeholder="Search card "
            />
            <span>
              <Search size={16} />
            </span>
          </div>
          <div className="border border-gray-300 flex items-center px-2 rounded-3xl  py-1">
            <select className="px-1 text-sm outline-none">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            <Card
              name="Engineering"
              person="Pramendra Singh"
              number="**** **** **** 1234"
              bgColor="#4e4f2eff"
              textColor="white"
              monthlyLimit="$5000"
              spent="$2000"
              balance="$30000"
              status="Active"
            />
            <Card
              name="Engineering"
              person="Pramendra Singh"
              number="**** **** **** 1234"
              bgColor="#1d2c91ff"
              textColor="white"
              monthlyLimit="$5000"
              spent="$2000"
              balance="$30000"
              status="Active"
            />
            <Card
              name="Engineering"
              person="Pramendra Singh"
              number="**** **** **** 1234"
              bgColor="#b83a96ff"
              textColor="white"
              monthlyLimit="$5000"
              spent="$2000"
              balance="$30000"
              status="Frozen"
            />
            <Card
              name="Engineering"
              person="Pramendra Singh"
              number="**** **** **** 1234"
              bgColor="#b46a17ff"
              textColor="white"
              monthlyLimit="$5000"
              spent="$2000"
              balance="$30000"
              status="Expired"
            />
            <Card
              name="Engineering"
              person="Pramendra Singh"
              number="**** **** **** 1234"
              bgColor="#21b5c6ff"
              textColor="white"
              monthlyLimit="$5000"
              spent="$2000"
              balance="$30000"
              status="Active"
            />
          </div>
        </div>

        {showCardFlow && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
            <div className=" rounded-2xl shadow-lg w-full max-w-lg bg-red-300  relative">
              {/* Close button */}
              <button
                onClick={() => setShowCardFlow(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>
              <CardFlow />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
