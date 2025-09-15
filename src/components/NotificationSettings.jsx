"use client";
import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: false,
  });

  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6   ">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-0">🔔 Notifications</h2>
        <p className="text-sm text-gray-500 mb-4">
          Configure how you receive notifications and alerts.
        </p>

        <div className="space-y-4">
          {[
            {
              label: "Email notifications",
              key: "email",
              subText: "Activate Email Notification",
            },
            {
              label: "SMS notifications",
              key: "sms",
              subText: "Activate SMS Notification",
            },
            {
              label: "Push notifications",
              key: "push",
              subText: "Activate Push Notification",
            },
            {
              label: "Weekly Reports",
              key: "weekly",
              subText: "Activate Weekly Reports",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-md -mb-1">{item.label}</span>
                <span className="text-sm text-gray-500">{item.subText}</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-full transition ${
                    notifications[item.key] ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-6 w-6 bg-white rounded-full shadow transform transition ${
                      notifications[item.key] ? "translate-x-5" : ""
                    }`}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-blue-700">
          Save Preferences
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-0">🔒 Security & Privacy</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage your account security settings.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Two-Factor Authentication</span>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Login Sessions</span>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
              View
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Change Password</span>
            <button className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300">
              Change
            </button>
          </div>
        </div>

        <button className="mt-6 w-1/2 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">
          Delete Account
        </button>
        <p className="text-xs text-gray-500 mt-2">
          This action cannot be undone. All data will be permanently deleted.
        </p>
      </div>
    </div>
  );
}
