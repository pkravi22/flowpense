"use client";
import { useState } from "react";

function BusinessVerification() {
  return <div className="p-4">Business Verification Settings</div>;
}

function Verification() {
  return <div className="p-4">User Verification Settings</div>;
}

function Subscription() {
  return <div className="p-4">Subscription Settings</div>;
}

function NotificationSettings() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Email Notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> SMS Notifications
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Push Notifications
        </label>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("business");

  const tabs = [
    { id: "business", label: "Business Verification" },
    { id: "verification", label: "Verification" },
    { id: "subscription", label: "Subscription" },
    { id: "notification", label: "Notification" },
  ];

  return (
    <div className="w-full  mx-auto mt-6">
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
            className={`flex-1 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 
              ${
                activeTab === tab.id
                  ? "bg-white text-[#101113] font-sans font-[600]"
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
