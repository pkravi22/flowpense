"use client";

import { useState } from "react";
import Sidebar from "../../layout/Appsidebar";
import Topbar from "../../layout/TopNavbar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // sidebar open on mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // collapse on desktop

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
      {/* Main Content Area - dynamically adjust based on sidebar state */}
      <div className="flex  flex-col flex-8 bg-gray-50 transition-all duration-300 ">
        <div className="sticky top-0 z-20">
          <Topbar setIsOpen={setIsOpen} />
        </div>

        {/* Page Content */}
        <main className="flex-1  overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}