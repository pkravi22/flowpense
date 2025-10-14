"use client";
import { CreditCard, Users, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import TransactionTable from "../../../components/UserTable";
import { fetchAllExpenses } from "@/redux/slices/expenseSlice";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [expenseData, setExpenseData] = useState([]);

  const { allExpenses, loading, error } = useSelector(
    (state) => state.expenses
  );

  // Safely extract expenses array
  const expenses = allExpenses?.expenses || [];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(fetchAllExpenses({ token }));
  }, [dispatch, router]);

  // Update local state when Redux data changes
  useEffect(() => {
    setExpenseData(expenses);
  }, [expenses]);

  const totalExpenses = expenseData.reduce(
    (sum, exp) => sum + (exp.Amount || 0),
    0
  );
  const approvedExpenses = expenseData
    .filter((exp) => exp.status === "Approved")
    .reduce((sum, exp) => sum + (exp.Amount || 0), 0);
  const pendingExpenses = expenseData
    .filter((exp) => exp.status === "Pending")
    .reduce((sum, exp) => sum + (exp.Amount || 0), 0);

  const cardDetails = [
    {
      id: 1,
      title: "Total Expenses",
      value: `₦${totalExpenses.toLocaleString()}`,
      icon: <Wallet />,
      iconBg: "#D1FAE5",
      iconColor: "#065F46",
      sub: "Overall total spent",
    },
    {
      id: 2,
      title: "Approved Expenses",
      value: `₦${approvedExpenses.toLocaleString()}`,
      icon: <CreditCard />,
      iconBg: "#FFD6D6",
      iconColor: "#B91C1C",
      sub: "Approved transactions",
    },
    {
      id: 3,
      title: "Pending Expenses",
      value: `₦${pendingExpenses.toLocaleString()}`,
      icon: <Users />,
      iconBg: "#E0E7FF",
      iconColor: "#1E40AF",
      sub: "Awaiting approval",
    },
  ];

  return (
    <div className="">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Expenses</h1>
          <p className="pageSubTitle mt-2">
            Monitor your business expenses and card usage
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

      <div>
        {/* Pass safe array to TransactionTable */}
        <TransactionTable allExpenses={expenses} />
      </div>
    </div>
  );
};

export default Page;
