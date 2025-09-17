"use client";
import NotificationSettings from "../../../components/NotificationSettings";
import BusinessVerification from "../../../components/BusinessVerification";
import Subscription from "../../../components/Subscription";
import Verification from "../../../components/Verification";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("business");

  const tabs = [
    { id: "business", label: "Business" },
    { id: "verification", label: "Verification" },
    { id: "subscription", label: "Subscription" },
    { id: "notification", label: "Notification" },
  ];

  return (
    <div className="w-full  mx-auto mt-0">
      <div>
        <h1 className="pageTitle">Setting</h1>
        <p className="pageSubTitle mt-2">
          Monitor your business information,setting and card usage
        </p>
      </div>
      <div className="flex items-center bg-gray-200 h-[45px] p-2 mt-4 rounded-2xl shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 rounded-2xl  h-[30px] cursor-pointer  
              ${
                activeTab === tab.id
                  ? "bg-white text-[#101113] font-sans font-[600] shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white mt-4 p-4 rounded-xl shadow-md">
        {activeTab === "business" && <BusinessVerification />}
        {activeTab === "verification" && <Verification />}
        {activeTab === "subscription" && <Subscription />}
        {activeTab === "notification" && <NotificationSettings />}
      </div>
    </div>
  );
}
