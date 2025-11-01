"use client";

import { logout } from "@/redux/slices/authSlice";
import { authService } from "@/services/authServices";
import { otherServices } from "@/services/otherServices";
import {
  ArrowBigRight,
  Bell,
  LogOut,
  Menu,
  User2Icon,
  UserCircle,
  UserIcon,
  Users2Icon,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { email } from "zod";

export default function Topbar({ setIsOpen }) {
  const [isClient, setIsClient] = useState(false);
  const [detailedUser, setDetailedUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userModal, setUsermodal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [NotiModal, setNotiMdal] = useState(false);
  const [notiLength, setnotiLength] = useState(1);
  const dispatch = useDispatch();
  const { user, token1 } = useSelector((state) => state.auth);
  const modalRef = useRef(null);
  const notiFicationRef = useRef(null);

  console.log("token1", token1);
  useEffect(() => {
    setIsClient(true);
    const t = localStorage.getItem("token");
    setToken(t);
    console.log("t", token);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notiFicationRef.current &&
        !notiFicationRef.current.contains(event.target)
      ) {
        setNotiMdal(false);
      }
    };
    if (NotiModal) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [NotiModal]);

  const handleLogout = () => {
    dispatch(logout());
    setUsermodal(false);
    window.location.href = "/login";
  };

  const getUserProfile = async () => {
    console.log("tokkkkken1", token);
    try {
      const response = await authService.getUserProfile({ token });
      setDetailedUser(response.user);
      console.log("User profile response:", response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const getNotifications = async () => {
    console.log("heelo notif");
    try {
      const response = await otherServices.getNotification({ token });
      setDetailedUser(response.notification);
      setnotiLength(response.notification.length);
      console.log("Notification response:", response);
    } catch (error) {
      console.error("Error fetching notification:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
      getNotifications();
    }
  }, [token]);

  const handlebellCLick = () => {
    setNotiMdal(!NotiModal);
  };

  if (!isClient) return null;

  return (
    <header className="h-[50px] w-full relative flex items-center justify-between px-4 shadow bg-white z-50">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden p-2 rounded bg-gray-200 shadow"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right side icons */}
      <div className="  flex items-center gap-1 flex-shrink-0">
        <button className="p-2 relative rounded-full bg-gray-100">
          <Image
            onClick={handlebellCLick}
            width={30}
            height={30}
            alt="notification_bell"
            src="/notification-bing.svg"
            className="w-6 h-6 text-gray-700 bg-gray-100 rounded-full"
          />
          {notiLength > 0 && (
            <span className="absolute top-2 right-1 inline-flex items-center justify-center px-1 py-0.5 text-xs font-semibold leading-none text-black bg-[#E5EE7D] rounded-full transform translate-x-1/2 -translate-y-1/2">
              {notiLength}
            </span>
          )}
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => setUsermodal(!userModal)}
        >
          <UserCircle size={32} className="text-gray-700" />
          <div className="text-gray-800 hidden sm:block">
            <p className="text-sm font-medium truncate max-w-[120px]">
              {detailedUser?.firstName + " " + detailedUser?.lastName ||
                userEmail}
            </p>
            <p className="text-xs text-gray-500">{user?.role || "User"}</p>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {userModal && (
        <div
          ref={modalRef}
          className="absolute top-[70px] right-4 min-w-[200px] bg-gray-100 shadow-lg rounded-2xl  p-4 animate-fadeIn"
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
            <div className="w-full flex flex-col gap-1 border-b pb-2">
              <p className="text-sm font-semibold text-gray-800">
                {detailedUser?.firstName + " " + detailedUser?.lastName ||
                  userEmail}
              </p>
              <p className="text-xs text-gray-500">{user?.role || "User"}</p>

              <div className="flex items-center justify-start gap-2 text-md font-semibold text-gray-800">
                <UserIcon
                  size={16}
                  className="text-md font-semibold text-gray-800"
                />
                <span>Update Profile</span>
              </div>
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
      {NotiModal && (
        <div
          ref={notiFicationRef}
          className="absolute top-[70px] right-4 min-w-[200px] bg-gray-100 shadow-lg rounded-2xl   animate-fadeIn p-2"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex gap-4 border-b">
              <h1>Notifications</h1>
              <button
                onClick={() => setNotiMdal(false)}
                className="p-1 hover:bg-gray-100 bg-gray-200 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-gray-500">No new notifications</p>
            ) : (
              notifications.map((noti, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col gap-1 border-b pb-2 p-4"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {noti.message || "Notification message"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(noti.date).toLocaleString() || "Date"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
}
