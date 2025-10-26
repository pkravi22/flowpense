"use client";

import { logout } from "@/redux/slices/authSlice";
import { ArrowBigRight, Bell, LogOut, Menu, UserCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { email } from "zod";

export default function Topbar({ setIsOpen }) {
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userModal, setUsermodal] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const t = localStorage.getItem("token");
    setToken(t);

    if (t) {
      try {
        const payload = JSON.parse(atob(t.split(".")[1]));
        const email = payload.email || "Admin";
        // Truncate email if too long
        const shortEmail =
          email.length > 20
            ? email.slice(0, 10) + "..." + email.split("@")[1]
            : email;
        setUserEmail(shortEmail);
      } catch (error) {
        console.error("Error parsing token:", error);
        setUserEmail("Admin");
      }
    }
  }, []);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUsermodal(false);
      }
    };
    if (userModal) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userModal]);

  const handleLogout = () => {
    dispatch(logout());
    setUsermodal(false);
    window.location.href = "/login";
  };

  if (!isClient) return null;

  return (
    <header className="h-[50px] w-full relative flex items-center justify-between px-4 shadow bg-white z-50">
      {/* Mobile sidebar toggle */}
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded bg-gray-200 shadow"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => setUsermodal(!userModal)}
        >
          <UserCircle size={32} className="text-gray-700" />
          <div className="text-gray-800 hidden sm:block">
            <p className="text-sm font-medium truncate max-w-[120px]">
              {userEmail}
            </p>
            <p className="text-xs text-gray-500">{user?.role || "User"}</p>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {userModal && (
        <div
          ref={modalRef}
          className="absolute top-[70px] right-4 min-w-[200px] bg-white shadow-lg rounded-2xl  p-4 animate-fadeIn"
        >
          {/* Close Button (for mobile view) */}
          <div className="flex justify-between items-center mb-3 sm:hidden">
            <h3 className="text-gray-700 font-semibold">Profile</h3>
            <button
              onClick={() => setUsermodal(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="w-full border-b pb-2">
              <p className="text-sm font-semibold text-gray-800">
                {user.email}
              </p>
              <p className="text-xs text-gray-500">{user?.role || "User"}</p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-2 text-white  border bg-green-800  hover:bg-green-900 py-1.5 rounded-lg transition cursor-pointer"
            >
              Logout
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
