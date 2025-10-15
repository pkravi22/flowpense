"use client";

import { logout } from "@/redux/slices/authSlice";
import { ArrowBigRight, Bell, Menu, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar({ setIsOpen }) {
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userModal, setUsermodal] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true); // ✅ indicates this runs only after client mount
    const t = localStorage.getItem("token");
    setToken(t);

    if (t) {
      try {
        const payload = JSON.parse(atob(t.split(".")[1]));
        setUserEmail(payload.email || "Admin");
      } catch (error) {
        console.error("Error parsing token:", error);
        setUserEmail("Admin");
      }
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const handleUserModal = () => setUsermodal(!userModal);

  // 🚫 Avoid hydration mismatch by rendering nothing until after mount
  if (!isClient) return null;

  return (
    <header className="h-[64px] w-full relative flex items-center justify-between px-4 shadow">
      {userModal && (
        <div className="absolute top-12 text-black flex flex-col gap-2 p-4 right-12 w-[200px] font-semibold h-[60px] border bg-white rounded-2xl">
          <div className="flex gap-2 cursor-pointer border rounded-md p-1">
            <button onClick={handleLogout}>Logout</button>
            <span>
              <ArrowBigRight />
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded bg-gray-200 shadow"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ">
        <button className="p-2 rounded-full">
          <Bell className="w-6 h-6 text-black" />
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded"
          onClick={handleUserModal}
        >
          <UserCircle size={32} className="text-black" />
          <div className="text-black hidden sm:block">
            <p className="text-sm font-medium">{userEmail}</p>
            <p className="text-xs text-black">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
