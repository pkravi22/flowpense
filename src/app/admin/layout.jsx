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
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 bg-gray-50">
        <div className="sticky top-0 z-20">
          <Topbar setIsOpen={setIsOpen} />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
