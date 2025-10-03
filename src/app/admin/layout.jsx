"use client";

import { useState } from "react";
import Sidebar from "../../layout/Appsidebar";
import Topbar from "../../layout/TopNavbar";
import { Provider, useSelector } from "react-redux";
import store from "../../redux/store.js";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
 const { user, token } = useSelector((state) => state.auth);
 console.log("user in Top", user);
  return (
    <Provider store={store}>
      <div className="flex h-screen overflow-hidden">
        <div className="">
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>

        <div className="flex  flex-col flex-8 bg-gray-50 transition-all duration-300 ">
          <div className="sticky top-0 z-20">
            <Topbar setIsOpen={setIsOpen} />
          </div>

          <main className="flex-1  overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </Provider>
  );
}