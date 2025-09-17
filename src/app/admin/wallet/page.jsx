import {
  ArrowUpRight,
  CreditCard,
  Download,
  Plus,
  Users,
  Wallet,
} from "lucide-react";
import DateRangePicker from "../../../components/DatePicker";
import React from "react";
import TransactionTable from "../../../components/UserTable";
import BankDetails from "../../../components/walletPages/BankDetails";
import RecentTransactions from "../../../components/walletPages/RecentTransactions";
import BalanceBreakdown from "../../../components/walletPages/BalanceBreakdown";

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
  return (
    <div className="">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Wallet</h1>
          <p className="pageSubTitle mt-2">
            Manage organization funds and transfer to cards
          </p>
        </div>
        <div>
          <div className="flex gap-2">
            <div>
              <button className=" flex items-center px-2 rounded-[10px] border-[.5px] boder-gray-50 p-1">
                <Download className="inline mr-2" size={16} />
                <span>Export Statement</span>
              </button>
            </div>
            <div>
              <button className=" flex items-center px-2  rounded-[10px] border-[1px] boder-gray-50 p-1">
                <ArrowUpRight className="inline mr-2" size={16} />
                <span> TRansfer Funds</span>
              </button>
            </div>
            <div>
              <button className=" flex items-center px-2 rounded-[10px] border-[1px] boder-gray-0 p-1 bg-[#035638] text-white">
                <Plus className="inline mr-2" size={16} />
                <span> Fund Wallet</span>
              </button>
            </div>
          </div>
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
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 mt-4 ">
          <div className="flex-1">
            <BankDetails />
          </div>
          <div className="flex-2">
            {" "}
            <RecentTransactions />
          </div>
        </div>
        <div>
          <BalanceBreakdown />
        </div>
      </div>
    </div>
  );
};

export default page;
