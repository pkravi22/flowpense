"use client";
import React, { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  approveExpense,
  fetchAllExpenses,
  fetchPendingApprovals,
} from "@/redux/slices/approvalSlice";
import { toast } from "react-toastify";

const Page = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [hydrated, setHydrated] = useState(false); // ✅ to detect client load
  const dispatch = useDispatch();

  const { allExpenses, pendingExpenses, loadingAll, loadingPending } =
    useSelector((state) => state.approvals);

  const [token, setToken] = useState(null);

  useEffect(() => {
    setHydrated(true);
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      dispatch(fetchAllExpenses(t));
      dispatch(fetchPendingApprovals(t));
    }
  }, [dispatch]);

  const handleApprove = (expenseId) => {
    const payload = { expenseId, action: "APPROVE" };
    dispatch(approveExpense({ payload, token })).then(() => {
      toast.success("Expense approved successfully!");
      dispatch(fetchPendingApprovals(token));
      dispatch(fetchAllExpenses(token));
    });
  };

  const handleReject = (expenseId) => {
    const payload = { expenseId, action: "REJECT" };
    dispatch(approveExpense({ payload, token })).then(() => {
      toast.success("Expense rejected successfully!");
      dispatch(fetchPendingApprovals(token));
      dispatch(fetchAllExpenses(token));
    });
  };

  // if (!hydrated || (!token && !loadingAll && !loadingPending)) {
  //   return (
  //     <div className="flex justify-center items-center h-[70vh]">
  //       <span className="h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></span>
  //     </div>
  //   );
  // }

  const pendingData = pendingExpenses?.pendingExpenses || [];
  const processedData =
    allExpenses?.allExpenses?.filter(
      (expense) =>
        expense.status === "Approved" || expense.status === "Rejected"
    ) || [];

  return (
    <div>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Approvals</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses approvals
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="mt-6 w-full flex items-center bg-gray-200 h-[45px] p-2 rounded-2xl shadow-md">
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 ${
              activeTab === "pending"
                ? "bg-white text-[#101113] font-sans font-[600]"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 ${
              activeTab === "processed"
                ? "bg-white text-[#101113] font-sans"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("processed")}
          >
            Processed
          </button>
        </div>

        {/* Pending Section */}
        {activeTab === "pending" && (
          <div className="mt-4 space-y-3">
            {loadingPending ? (
              <div className="flex justify-center py-10">
                <span className="h-8 w-8 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></span>
              </div>
            ) : pendingData.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No pending approvals found
              </p>
            ) : (
              pendingData.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2  sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <h2 className="font-semibold font-sans">
                        {item.merchant}
                      </h2>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-bold">₦{item.Amount}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex gap-2 cursor-pointer items-center bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() => handleApprove(item.id)}
                    >
                      <CircleCheckBig size={16} />
                      Approve
                    </button>
                    <button
                      className="flex gap-2 cursor-pointer items-center border border-red-500 text-red-500 px-4 py-1 rounded-md"
                      onClick={() => handleReject(item.id)}
                    >
                      <CircleCheckBig size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Processed Section */}
        {activeTab === "processed" && (
          <div className="mt-4 space-y-3">
            {loadingAll ? (
              <div className="flex justify-center py-10">
                <span className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></span>
              </div>
            ) : processedData.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No processed approvals found
              </p>
            ) : (
              processedData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-2 sm:p-4 rounded-lg shadow-md"
                >
                  <div>
                    <h2 className="font-semibold">{item.merchant}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-bold">₦{item.Amount}</p>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 flex gap-2 items-center rounded-md text-sm font-semibold ${
                        item.status === "Approved"
                          ? "bg-black px-2 sm:px-8 py-2 text-white"
                          : "px-8 py-2 border border-red-500 text-red-600"
                      }`}
                    >
                      <CircleCheckBig size={16} />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
