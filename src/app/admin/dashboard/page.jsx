"use client";

import React, { useEffect, useState } from "react";
import Piechart from "@/components/PieChart";
//import Example from "@/components/Barchart";
import Card from "@/components/Card";
import DateRangePicker from "@/components/DatePicker";
import VerifyAccount from "@/components/verification_pages/VerificationFlow";
import { companyServices } from "@/services/companyServices.js";
//import Slider from "react-slick";

import {
  ArrowRight,
  BoxSelect,
  ChevronDown,
  CreditCard,
  Users,
  Wallet,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Example from "@/components/BarChart";
import { fetchAllCards } from "@/redux/slices/cardSlice";
import { fetchAllExpenses } from "@/redux/slices/expenseSlice";
import { useRouter } from "next/navigation";

//import React, { useState } from "react";
//import DateRangePicker from "@/components/DatePicker";
//import VerifyAccount from "@/components/verification_pages/VerificationFlow";

//import VerificationFlow from "../../../components/verification_pages/VerificationFlow";

const cardDetails = [
  {
    id: 1,
    title: "Total Spent",
    value: "$12,345.67",
    icon: <BoxSelect />,
    iconBg: "#E5EE7D",
    iconColor: "#035638",
    sub: "10 % increase from last month",
  },
  {
    id: 2,
    title: "Total Cards",
    value: "15",
    icon: <CreditCard />,
    iconBg: "#FFD6D6",
    iconColor: "#B91C1C",
    sub: "15 % increase from last month",
  },
  {
    id: 3,
    title: "Team Members",
    value: "48",
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
//const verified = false;
const cards = [
  {
    name: "Engineering",
    person: "Pramendra Singh",
    number: "3242 **** **** 1234",
    bgColor: "#2e4f38ff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Active",
  },
  {
    name: "Engineering",
    person: "Pramendra Singh",
    number: "3242 **** **** 1234",
    bgColor: "#2e4f38ff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Active",
  },
  {
    name: "Engineering",
    person: "Adebayo Okafor",
    number: "4563 **** **** 1234",
    bgColor: "#b83a96ff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Frozen",
  },
  {
    name: "Engineering",
    person: "Pramendra Singh",
    number: "6573 **** **** 1234",
    bgColor: "#b46a17ff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Expired",
  },
  {
    name: "Engineering",
    person: "Adebayo Okafor",
    number: "6784 **** **** 1234",
    bgColor: "#21b5c6ff",
    textColor: "white",
    monthlyLimit: "$5000",
    spent: "$2000",
    balance: "$30000",
    status: "Active",
  },
];
const cardColors = [
  { bgColor: "#4e4f2eff", textColor: "white" },
  { bgColor: "#1d2c91ff", textColor: "white" },
  { bgColor: "#13aa64ff", textColor: "white" },
  { bgColor: "#8B4513", textColor: "white" },
  { bgColor: "#2F4F4F", textColor: "white" },
  { bgColor: "#800020", textColor: "white" },
];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: "unslick",
    },
  ],
};
const Page = () => {
  const [verified, setVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);
  console.log("token from store", token);
  let storedCompany = null;
  let storedVerified = null;
  const dispatch = useDispatch();
  const {
    allCards,
    loading: cardsLoading,
    error: cardsError,
  } = useSelector((state) => state.cards);
  const {
    allExpenses,
    loading: expensesLoading,
    error: expensesError,
  } = useSelector((state) => state.expenses);

  console.log("hello dash");
  const handleVerifyClick = () => {
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    setVerified(true);
    setShowVerification(false);

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("verified", "true");
    // }
  };

  useEffect(() => {
    // Runs only in browser
    //  const token =
    //    typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      dispatch(fetchAllCards({ token }));
      dispatch(fetchAllExpenses({ token }));
    }
  }, [dispatch]);

  const getCompanyDetails = async () => {
    // console.log("Fetching company details with token:", token);
    try {
      // if (typeof window !== "undefined") {
      //   storedCompany = localStorage.getItem("companyData");
      //   storedVerified = localStorage.getItem("verified");
      // }
      // if (storedCompany) {
      //   const parsedCompany = JSON.parse(storedCompany);
      //   setCompanyData(parsedCompany);
      //   setVerified(storedVerified === "true");
      //   return;
      // }

      const data = await companyServices.getCompanyInfo({ token });
      console.log("Fetched company data:", data);

      if (data.success && data.company) {
        setCompanyData(data.company);
        const isVerified = data.company.kycStatus !== "pending";
        setVerified(isVerified);

        // localStorage.setItem("companyData", JSON.stringify(data.company));
        // localStorage.setItem("verified", isVerified.toString());
      }
    } catch (e) {
      console.error("Error fetching company info:", e);
      setVerified(false);
    }
  };

  useEffect(() => {
    getCompanyDetails(token);
  }, []);

  console.log("all cards", allCards.cards);
  console.log("all expenses", allExpenses.expenses);
  return (
    <div className="p-0 md:p-4 overflow-visible bg-gray-100">
      <div className="flex flex-col  items-center justify-between">
        {!verified && (
          <div className="border-l-4 bg-[#035638] rounded-xl flex flex-col md:flex-row gap-2 w-full justify-between items-center p-4 mb-4">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-[#E5EE7D]">
                Verify Your Business to Unlock Full Access
              </p>
              <p className="text-[12px] text-white">
                Verify your business to unlock all Funkash Flow features with
                secure, fast approval.
              </p>
            </div>
            <button
              onClick={handleVerifyClick}
              className="flex md:w-[150px] items-center gap-2 rounded-2xl px-4 py-1 cursor-pointer hover:text-white transition duration-300 ease-in-out"
            >
              <span className="p-2 text-green-400 text-[12px] w-full flex items-center justify-center bg-white rounded-2xl">
                Verify Now
                <ArrowRight size={12} />
              </span>
            </button>
          </div>
        )}

        {showVerification && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-25 flex items-center justify-center z-50">
            <div className="bg-white  rounded-xl w-[90%] md:w-[600px] shadow-lg">
              <VerifyAccount
                onComplete={handleVerificationComplete}
                onCancel={() => setShowVerification(false)}
              />
            </div>
          </div>
        )}
        <div className="w-full flex flex-col md:flex-row  items-start md:items-center   md:justify-between gap-4">
          <div>
            <h1 className="pageTitle">Dashboard</h1>
            <p className="pageSubTitle mt-2">
              Monitor your business expenses and card usage
            </p>
          </div>
          <div>
            {/* Date selection area */}
            {/* <div className="">
              <DateRangePicker />
            </div> */}
          </div>
        </div>
      </div>

      {/* stat-Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
      {/*  charts */}
      <div className="flex flex-col  md:flex-row gap-6 mt-6  p-2 rounded-2xl ">
        {/*  Bar charts */}
        <div className="flex flex-col flex-3 gap-6 bg-white shadow-md p-4  md:min-h-[400px] rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            {/* Header */}
            <div className="flex flex-col gap-2 shadow-md rounded-2xl p-1  ">
              <p className="statcardTitle">Totoal Revenue</p>
              <p className="statcardNumber">$ 0</p>
              <p className="text-red-500">-52% Decline in Revenue</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div>
                <div className="bg-[#1D1D2A] rounded-4xl px-4 py-1 border border-black flex gap-2 w-[120px] items-center text-white">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Expenses
                </div>
              </div>
              <div>
                <div className="border border-gray-400 flex gap-4 items-center rounded-2xl px-2 py-1 ">
                  <p>This Month </p>
                  <span>
                    <ChevronDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full min-w-[300px] min-h-[300px] ">
            {/* Chart area */}
            <div className="w-full h-[250px] ">
              <Example allExpenses={allExpenses} />
            </div>
          </div>
        </div>
        {/*  Pie charts */}
        <div className="flex-2 bg-white flex gap-3 flex-col items-center md:min-h-[400px] rounded-2xl justify-center">
          <div className="flex justify-between w-full px-6 py-4">
            <p className="font-semibold text-gray-800">Spend Category</p>
            <p>
              <select
                className="border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="September"
              >
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </p>
          </div>

          <div className="flex justify-center">
            <Piechart allExpenses={allExpenses} />
          </div>
          <div className="w-full px-6 my-2">
            <button className="text-text-primary  cursor-pointer flex items-center justify-center gap-2  rounded w-full py-2 text-center border border-borderColor">
              View Details
              <span>
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Active Cards */}
      <div className=" bg-white p-2 rounded-2xl shadow-md">
        <div className="flex items-center justify-between ">
          <div>
            <p className="pageTitle">Active Cards</p>
            <p className="pageSubTitle mt-2">
              Manage virtual business cards and spending limits
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="border border-black text-[#035638] flex p-2 w-[100px] text-[12px] justify-center items-center gap-1 rounded-lg mt-4 cursor-pointer hover:bg-[#035638] hover:text-white transition duration-300 ease-in-out">
              <p>View All</p>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="">
          {/* Desktop: grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-4">
            {allCards?.cards?.length > 0 ? (
              allCards.cards.map((card, index) => {
                const color = cardColors[index % cardColors.length]; // cycle through colors
                return (
                  <Card
                    key={index}
                    rawData={card}
                    bgColor={color.bgColor}
                    textColor={color.textColor}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                );
              })
            ) : (
              <p className="text-gray-500">No active cards available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
