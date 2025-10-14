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
  const { allExpenses } = useSelector((state) => state.expenses) || {};
  const [expenseData, setExpenseData] = useState([]);

  // Fetch expenses
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
      return;
    }
    dispatch(fetchAllExpenses({ token }));
  }, [dispatch, router]);

  // Normalize data
  useEffect(() => {
    if (allExpenses?.expenses) {
      const normalized = allExpenses.expenses.map((exp) => ({
        id: exp.id,
        merchant: exp.merchant,
        category: exp.category,
        amount: exp.Amount, // normalize field
        status: exp.status,
        date: new Date(exp.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        cardDetails: exp.card?.CardName || "-",
        cardHolder: exp.user
          ? `${exp.user.firstName} ${exp.user.lastName}`
          : "-",
      }));
      setExpenseData(normalized);
    } else {
      setExpenseData([]);
    }
  }, [allExpenses]);

  // Totals
  const totalExpenses = expenseData.reduce(
    (sum, exp) => sum + (exp.amount || 0),
    0
  );
  const approvedExpenses = expenseData
    .filter((exp) => exp.status === "Approved")
    .reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const pendingExpenses = expenseData
    .filter((exp) => exp.status === "Pending")
    .reduce((sum, exp) => sum + (exp.amount || 0), 0);

  const cardDetails = [
    {
      id: 1,
      title: "Total Expenses",
      value: `₦${totalExpenses.toLocaleString()}`,
      icon: <Wallet />,
      iconColor: "#065F46",
      sub: "Overall total spent",
    },
    {
      id: 2,
      title: "Approved Expenses",
      value: `₦${approvedExpenses.toLocaleString()}`,
      icon: <CreditCard />,
      iconColor: "#B91C1C",
      sub: "Approved transactions",
    },
    {
      id: 3,
      title: "Pending Expenses",
      value: `₦${pendingExpenses.toLocaleString()}`,
      icon: <Users />,
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
        {cardDetails.map(({ id, icon, iconColor, title, value, sub }) => (
          <div
            key={id}
            className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-start gap-4"
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
        ))}
      </div>

      <div className="mt-6">
        <TransactionTable expenseData={expenseData} />
      </div>
    </div>
  );
};

export default Page;
