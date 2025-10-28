import React, { useEffect, useState } from "react";
import {
  X,
  CreditCard,
  Lock,
  Send,
  Settings,
  CheckCircle,
  Clock,
  XCircle,
  CircleCheckBig,
} from "lucide-react";
import CardSettings from "../cardComponents/CardSettings";

const approvalsRequest = [
  {
    CardName: "Alpha",
    Requester: "Pramendra Singh",
    date: "2025-10-26T08:30:00.000Z",
    amount: 1500,
    Limit: 5000,
  },
  {
    CardName: "Beta",
    Requester: "Rohan Sharma",
    date: "2025-10-25T14:20:00.000Z",
    amount: 2000,
    Limit: 7000,
  },
  {
    CardName: "Gamma",
    Requester: "Anita Verma",
    date: "2025-10-24T11:10:00.000Z",
    amount: 1200,
    Limit: 3000,
  },
];

const CardModal = ({ card, onClose, transactions }) => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const closeModal = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!card) return null;

  return (
    <div className="fixed inset-0 flex z-50">
      {/* Overlay */}
      <div
        className={`flex-1 bg-black/40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeModal}
      ></div>

      {/* Right Panel */}
      <div
        className={`w-[650px] bg-white shadow-2xl h-full p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 bg-gray-200 p-1 rounded-full hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6">Engineering Team Card</h2>

        {/* Card Details Section */}
        <div className="flex flex-col md:flex-row justify-between items-start bg-gray-50 rounded-xl p-4 mb-6">
          {/* Left side card visual */}
          <div className="bg-[#035638] text-white rounded-xl p-2 w-full md:w-[55%]">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <p className="font-medium">
                  {card?.CardName}
                  <span className="text-xs ml-2 text-gray-200">
                    ({card?.CardType})
                  </span>
                </p>
              </div>
            </div>

            <p className="text-lg tracking-wider mb-3">{card?.CardNumber}</p>

            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <p className="text-gray-300 text-sm">Expiry Date</p>
                <p className="font-medium text-md ">12/27</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-gray-300 text-sm ">CVV</p>
                <p className="font-medium text-md ">123</p>
              </div>
            </div>
          </div>

          {/* Right side info */}
          <div className="flex flex-col justify-between w-full md:w-[40%]">
            <div className="flex justify-end">
              <p
                className={`mt-2 text-sm font-medium ${
                  card?.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                ● {card?.status}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-gray-500">Team Lead</p>
                <p className="text-md text-gray-800">{card?.Approver[0]}</p>
              </div>

              <div className="">
                <p className="font-semibold text-gray-500">Balance</p>
                <p className="text-lg font-bold text-green-700">
                  {card?.CardFunding}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-500">Monthly Spend</p>
              <div className="w-full bg-gray-200 h-[6px] rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-[6px]"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ₹15,000 / {card?.MonthlyLimit}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button className="flex justify-center gap-1 border-gray-300 items-center bg-yellow-100 border rounded-lg py-2 hover:bg-yellow-200">
            <CreditCard size={18} />
            <span className="text-xs mt-1 font-medium">Fund Card</span>
          </button>
          <button className="flex justify-center gap-1 border-gray-300 items-center bg-yellow-1 border rounded-lg py-2 hover:bg-yellow-200">
            <Lock size={18} />
            <span className="text-xs mt-1 font-medium">Freeze Card</span>
          </button>
          <button className="flex justify-center gap-1 border-gray-300 items-center bg-yellow-1 border rounded-lg py-2 hover:bg-yellow-200">
            <Send size={18} />
            <span className="text-xs mt-1 font-medium">Transfer Funds</span>
          </button>
          <button className="flex justify-center gap-1 border-gray-300 items-center bg-yellow-1 border rounded-lg py-2 hover:bg-yellow-200">
            <Settings size={18} />
            <span className="text-xs mt-1 font-medium">Edit Limits</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b flex gap-6 mb-4 text-sm">
          {["transactions", "approvals", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-600 font-medium"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "transactions" && (
          <div className="overflow-x-auto">
            {transactions?.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Merchant</th>
                    <th className="p-2 text-left">Category</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-2">{t.date}</td>
                      <td className="p-2">{t.merchant}</td>
                      <td className="p-2">{t.category}</td>
                      <td className="p-2">{t.amount}</td>
                      <td className="p-2 flex items-center gap-1">
                        {t.status === "Approved" && (
                          <CheckCircle size={14} className="text-green-500" />
                        )}
                        {t.status === "Pending" && (
                          <Clock size={14} className="text-yellow-500" />
                        )}
                        {t.status === "Failed" && (
                          <XCircle size={14} className="text-red-500" />
                        )}
                        {t.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
                No transactions found
              </div>
            )}
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="py-6">
            <div className="text-lg">Pending Approvals (hardcoded)</div>
            {approvalsRequest && approvalsRequest.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {approvalsRequest.map((req, index) => (
                  <React.Fragment key={index}>
                    <div className=" p-3 rounded   ">
                      <p className="text-sm text-gray-900"> {req.Requester}</p>
                      <p className="font-normal text-gray-400">
                        {" "}
                        {req.CardName}
                      </p>

                      <p className="text-sm text-gray-400">
                        Date: {new Date(req.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className=" p-3 rounded  ">
                      <p className="font-normal text-gray-400 flex flex-col">
                        Amount:
                      </p>
                      <p className="font-medium text-gray-900">{req.amount}</p>
                    </div>

                    <div className="flex items-center justify-center">
                      <button className=" flex justify-center items-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg ">
                        <CircleCheckBig size={16} />
                        Approve
                      </button>
                    </div>

                    <div className="flex items-center justify-center">
                      <button className=" flex justify-center items-center gap-2 w-full text-red-600 border border-gray-200 py-2 rounded-lg">
                        <CircleCheckBig size={16} />
                        Reject
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">
                No approvals available
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && <CardSettings card={card} />}
      </div>
    </div>
  );
};

export default CardModal;
