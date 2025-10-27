"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../data/SidebarData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Sidebar({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden">
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-4">
            <button
              className="mb-4 p-2 rounded bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center mb-2 mt-2 ">
              <div className="flex flex-nowrap  ">
                <Image
                  src="/app_logo.svg"
                  alt="logo"
                  width={180}
                  height={40}
                ></Image>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarLinks.map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={i}
                    href={link.path}
                    className={`flex items-center gap-3 p-2 rounded-full px-4 hover:bg-gray-100 ${
                      isActive
                        ? "bg-[#035638] text-[#E5EE7D] hover:bg-[#043b27]"
                        : "linkText hover:bg-gray-200"
                    }`}
                    onClick={() => setIsOpen(false)} // close mobile menu on click
                  >
                    {link.icon}
                    <span className="font-bagel">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
      <div
        className={`hidden md:flex  flex-col border-r bg-white shadow-lg h-screen transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-48"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <div className="flex flex-nowrap ">
                <Image
                  src="/app_logo.svg"
                  alt="logo"
                  width={180}
                  height={40}
                ></Image>
              </div>
            )}
          </div>
          <button
            className="p-1   md:ml-4  rounded bg-gray-100"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 " />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={i}
                href={link.path}
                className={`flex items-center  gap-3 px-4 py-2 rounded-4xl  text-[#E5EE7D]  ${
                  isActive
                    ? "bg-[#035638] text-[#E5EE7D] hover:bg-[#043b27] "
                    : "linkText hover:bg-gray-200"
                }`}
              >
                {link.icon}
                {!isCollapsed && (
                  <span className="font-bagel">{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      ;
    </>
  );
}
