"use client";
import { CreditCard, Users, Wallet } from "lucide-react";
import DateRangePicker from "../../../components/DatePicker";
import React, { useEffect, useState } from "react";
import TransactionTable from "../../../components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAllExpenses } from "@/redux/slices/expenseSlice";
const cardDetails = [
  {
    id: 2,
    title: "Completed",
    value: "$15,00,000",
    icon: <CreditCard />,
    iconBg: "#FFD6D6",
    iconColor: "#B91C1C",
    sub: "15 % increase from last month",
  },
  {
    id: 3,
    title: "Pending",
    value: "$45,00,000",
    icon: <Users />,
    iconBg: "#E0E7FF",
    iconColor: "#1E40AF",
    sub: " 4 % increase from last month",
  },
  {
    id: 4,
    title: "Pending",
    value: "$8,250.00",
    icon: <Wallet />,
    iconBg: "#D1FAE5",
    iconColor: "#065F46",
    sub: "4 % increase from last month",
  },
];
const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [expenseData, setExpenseData] = useState([]);
  const { allExpenses, loading, error } = useSelector(
    (state) => state.expenses
  );
  console.log("All Expenses:", allExpenses.expenses);
  // setExpenseData(allExpenses?.expenses || []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchAllExpenses({ token }));
      setExpenseData(allExpenses?.expenses || []);
    } else {
      console.error("No authentication token found - redirecting to login");
      router.push("/login");
    }
  }, [dispatch, router]);

  const totalExpenses = expenseData.reduce((sum, exp) => sum + exp.Amount, 0);
  const approvedExpenses = expenseData
    .filter((exp) => exp.status === "Approved")
    .reduce((sum, exp) => sum + exp.Amount, 0);
  const pendingExpenses = expenseData
    .filter((exp) => exp.status === "Pending")
    .reduce((sum, exp) => sum + exp.Amount, 0);

  // === Dynamic Stat Cards ===
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
        <div>
          {/* Date selection area */}
          {/* <div className="">
            <DateRangePicker />
          </div> */}
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
        <TransactionTable allExpenses={allExpenses} />
      </div>
    </div>
  );
};

export default page;
