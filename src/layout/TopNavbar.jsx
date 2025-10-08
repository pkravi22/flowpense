"use client";

import { ArrowBigRight, Bell, Menu, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar({ setIsOpen }) {
   const [token, setToken] = useState(null);
   const [userEmail, setUserEmail] = useState(null);
   useEffect(() => {
     const t = localStorage.getItem("token");
     setToken(t);

     // Only parse the token if it exists
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

   const [userModal, setUsermodal] = useState(false);
   const handleUserModal = () => {
     setUsermodal(!userModal);
   };
   return (
     <header className="h-[64px] w-full relative   flex items-center justify-between px-4 shadow">
       {/* Left Section */}
       {userModal && (
         <div className="absolute top-12 text-black flex flex-col gap-2 p-4 right-12 w-[200px] font-semibold h-[100px] border bg-white rounded-2xl ">
           <div className="cursor-pointer border rounded-md p-1">
             <p>Profile</p>
           </div>
           <div className="flex gap-2 cursor-pointer border rounded-md p-1">
             <p>Log Out</p>{" "}
             <span>
               <ArrowBigRight />
             </span>
           </div>
         </div>
       )}
       <div className="flex items-center gap-2">
         {/* Mobile Menu */}
         <button
           className="md:hidden p-2 rounded bg-gray-200 shadow"
           onClick={() => setIsOpen(true)}
         >
           <Menu className="w-6 h-6" />
         </button>
       </div>

       <div className="flex items-center gap-4 flex-shrink-0 ">
         {/* Bell */}
         <button className="p-2 rounded-full 0">
           <Bell className="w-6 h-6 text-black" />
         </button>

         <div
           className="flex items-center  gap-2 cursor-pointer  px-3 py-1 rounded "
           onClick={handleUserModal}
         >
           <UserCircle size={32} className="text-black" />
           <div className="text-black hidden sm:block">
             <p className="text-sm font-medium">{userEmail}</p>
             <p className="text-xs text-black">Admin</p>
           </div>
         </div>
       </div>
     </header>
   );
}
