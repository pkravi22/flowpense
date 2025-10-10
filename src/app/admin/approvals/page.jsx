"use client";
import React, { useEffect, useState } from "react";
import DateRangePicker from "../../../components/DatePicker";
import { CircleCheckBig, CircleCheckBigIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExpenses } from "@/redux/slices/expenseSlice";
import {
  approveExpense,
  fetchPendingApprovals,
  rejectExpense,
} from "@/redux/slices/approvalSlice";

const Page = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingData = [
    {
      id: 1,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
    {
      id: 2,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
    {
      id: 3,
      merchant: "Olive Garden",
      card: "Marketing Team Card",
      date: "17 August, 2025",
      amount: "₦85,000",
    },
  ];

  const processedData = [
    {
      id: 101,
      merchant: "Olive Garden",
      card: "Finance Team Card",
      date: "15 August, 2025",
      amount: "₦50,000",
      status: "Approved",
    },
    {
      id: 102,
      merchant: "Olive Garden",
      card: "HR Team Card",
      date: "14 August, 2025",
      amount: "₦40,000",
      status: "Rejected",
    },
  ];

  const dispatch = useDispatch();
  const {
    allExpenses,
    pendingExpenses,
    loadingAll,
    loadingPending,
    errorAll,
    errorPending,
  } = useSelector((state) => state.approvals);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      dispatch(fetchAllExpenses(token));
      dispatch(fetchPendingApprovals(token));
    }
  }, [dispatch]);

  const handleApprove = (expenseId) => {
    //const token = localStorage.getItem("token");
    const payload = { expenseId, action: "APPROVE" };
    alert("Your transaction is being processed");
    dispatch(approveExpense({ payload, token }));
  };

  const handleReject = (expenseId) => {
    //const token = localStorage.getItem("token");
    const payload = { expenseId, action: "REJECT" };
    alert("Your transaction is being processed");
    dispatch(approveExpense({ payload, token }));
  };

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start  sm:items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Approvals</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses approvals
          </p>
        </div>
        <DateRangePicker />
      </div>

      <div>
        <div className="mt-6 w-full flex items-center bg-gray-200 h-[45px] p-2 rounded-2xl shadow-md">
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 
              ${
                activeTab === "pending"
                  ? "bg-white text-[#101113] font-sans font-[600]"
                  : "bg-gray-200 text-gray-600 "
              }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 
              ${
                activeTab === "processed"
                  ? "bg-white text-[#101113] font-sans"
                  : "bg-gray-100 text-gray-600 "
              }`}
            onClick={() => setActiveTab("processed")}
          >
            Processed
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {activeTab === "pending" &&
            pendingData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="font-semibold font-sans">{item.merchant}</h2>
                  <p className="text-sm text-gray-500">{item.card}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold">{item.amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className=" flex gap-2 cursor-pointer items-center bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() => handleApprove(item.id)}
                    >
                      <CircleCheckBig size={16} />
                      Approve
                    </button>
                    <button
                      className=" flex gap-2 cursor-pointer items-center border border-red-500 text-red-500 px-4 py-1 rounded-md"
                      onClick={() => handleReject(item.id)}
                    >
                      <CircleCheckBig size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "processed" &&
            processedData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div>
                  <h2 className="font-semibold">{item.merchant}</h2>
                  <p className="text-sm text-gray-500">{item.card}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold">{item.amount}</p>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 flex gap-2 items-center rounded-md text-sm font-semibold ${
                      item.status === "Approved"
                        ? "bg-black px-8 py-2 text-white "
                        : " px-8 py-2 border border-red-500 text-red-600"
                    }`}
                  >
                    <CircleCheckBig size={16} />
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
