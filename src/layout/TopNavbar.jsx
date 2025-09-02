"use client";

import { Bell, Menu, UserCircle } from "lucide-react";

export default function Topbar({ setIsOpen }) {
  return (
    <header className="h-[64px] w-full   flex items-center justify-between px-4 shadow">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded bg-gray-200 shadow"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg hidden sm:block">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ">
        {/* Bell */}
        <button className="p-2 rounded-full 0">
          <Bell className="w-6 h-6 text-black" />
        </button>

        <div className="flex items-center  gap-2 cursor-pointer  px-3 py-1 rounded">
          <UserCircle size={32} className="text-black" />
          <div className="text-black hidden sm:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-black">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
