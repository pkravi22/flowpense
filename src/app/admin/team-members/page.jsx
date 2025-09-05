"use client";
import EmployeeTable from "../../../components/EmployeeTable";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("team");

  const teamData = [
    {
      id: 1,
      name: "Marketing Team",
      subheading: "Handles all marketing campaigns",
      budget: "₦500,000",
      monthlyLimit: "₦50,000",
      size: 5,
      createdDate: "01 August, 2025",
      members: [
        {
          name: "John Doe",
          role: "Manager",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Diana Prince",
          role: "Executive",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Ethan Hunt",
          role: "Coordinator",
          img: "https://randomuser.me/api/portraits/men/54.jpg",
        },
        {
          name: "Fiona Gallagher",
          role: "Analyst",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "George Martin",
          role: "Intern",
          img: "https://randomuser.me/api/portraits/men/22.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Finance Team",
      subheading: "Manages company finances",
      budget: "₦800,000",
      monthlyLimit: "₦80,000",
      size: 4,
      createdDate: "15 July, 2025",
      members: [
        {
          name: "Jane Smith",
          role: "Manager",
          img: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        {
          name: "Ethan Hunt",
          role: "Analyst",
          img: "https://randomuser.me/api/portraits/men/54.jpg",
        },
        {
          name: "Bob Williams",
          role: "Executive",
          img: "https://randomuser.me/api/portraits/men/43.jpg",
        },
        {
          name: "Alice Johnson",
          role: "Coordinator",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "HR Team",
      subheading: "Handles recruitment and employee welfare",
      budget: "₦400,000",
      monthlyLimit: "₦40,000",
      size: 3,
      createdDate: "20 June, 2025",
      members: [
        {
          name: "Alice Johnson",
          role: "Manager",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Fiona Gallagher",
          role: "Executive",
          img: "https://randomuser.me/api/portraits/women/21.jpg",
        },
        {
          name: "Charlie Brown",
          role: "Intern",
          img: "https://randomuser.me/api/portraits/men/34.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Engineering Team",
      subheading: "Develops and maintains products",
      budget: "₦1,200,000",
      monthlyLimit: "₦120,000",
      size: 8,
      createdDate: "10 May, 2025",
      members: [
        {
          name: "Bob Williams",
          role: "Lead Engineer",
          img: "https://randomuser.me/api/portraits/men/43.jpg",
        },
        {
          name: "George Martin",
          role: "Engineer",
          img: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          name: "Hannah Lee",
          role: "Engineer",
          img: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        {
          name: "John Doe",
          role: "Intern",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Diana Prince",
          role: "Intern",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Fiona Gallagher",
          role: "Engineer",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Ethan Hunt",
          role: "Engineer",
          img: "https://randomuser.me/api/portraits/men/54.jpg",
        },
        {
          name: "Alice Johnson",
          role: "Engineer",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "Sales Team",
      subheading: "Manages client relationships and sales",
      budget: "₦600,000",
      monthlyLimit: "₦60,000",
      size: 6,
      createdDate: "05 April, 2025",
      members: [
        {
          name: "Charlie Brown",
          role: "Manager",
          img: "https://randomuser.me/api/portraits/men/34.jpg",
        },
        {
          name: "Hannah Lee",
          role: "Executive",
          img: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        {
          name: "George Martin",
          role: "Salesperson",
          img: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          name: "Diana Prince",
          role: "Salesperson",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "John Doe",
          role: "Salesperson",
          img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Alice Johnson",
          role: "Salesperson",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
      ],
    },
  ];

  const employeeData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Marketing",
      department: "Marketing",
      status: "Active",
      dateJoined: "01 Jan, 2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Finance",
      department: "Finance",
      status: "Inactive",
      dateJoined: "15 Feb, 2025",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "HR",
      department: "HR",
      status: "Active",
      dateJoined: "20 Mar, 2025",
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob@example.com",
      role: "Engineering",
      department: "Engineering",
      status: "Active",
      dateJoined: "10 Apr, 2025",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Sales",
      department: "Sales",
      status: "Active",
      dateJoined: "05 May, 2025",
    },
    // ...more employees
  ];

  return (
    <div>
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Team Management</h1>
          <p className="pageSubTitle mt-2">
            Manage your teams and employees efficiently
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="mt-6 w-full flex items-center bg-gray-200 h-[45px] p-2 rounded-2xl shadow-md">
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 
              ${
                activeTab === "team"
                  ? "bg-white text-[#101113] font-semibold"
                  : "bg-gray-200 text-gray-600"
              }`}
            onClick={() => setActiveTab("team")}
          >
            Team Management
          </button>
          <button
            className={`w-1/2 rounded-2xl shadow-md h-[30px] cursor-pointer border border-gray-300 
              ${
                activeTab === "employee"
                  ? "bg-white text-[#101113] font-semibold"
                  : "bg-gray-200 text-gray-600"
              }`}
            onClick={() => setActiveTab("employee")}
          >
            Employee
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4 space-y-4">
          {/* Team Management Tab */}
          {activeTab === "team" &&
            teamData.map((team) => (
              <div
                key={team.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
              >
                {/* Row 1: Team Name + Subheading + Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-sans text-[#020817] text-xl not-italic font-semibold leading-[100%] tracking-[-0.6px];">
                      {team.name}
                    </h2>
                    <p className="text-slate-500 text-[13.563px] not-italic font-normal leading-5">
                      {team.subheading}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
                    Add Member
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4  gap-6 text-sm text-gray-700">
                  {/* Budget Column */}
                  <div className="flex flex-3 flex-col gap-1 ">
                    <p className="font-semibold">Budget Usage</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className=" text-[color:var(--Neutral-Neutral400,#838794)] text-xs not-italic font-light leading-[100%]">
                        Monthly Spent
                      </p>
                      <span>{team.budget}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-xs not-italic font-light leading-[100%]">
                        25% used {"   "}This Month
                      </p>
                      <span>{team.monthlyLimit}</span>
                    </div>
                  </div>

                  {/* Team Size Column */}
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">Team Size</p>
                    <span className="bg-blue-100 w-[120px] text-center py-1 rounded-3xl">
                      {team.size} Members
                    </span>
                  </div>

                  {/* Created Date Column */}
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">Created Date</p>
                    <span>{team.createdDate}</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-semibold">Team Members</p>
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 3).map((member, idx) => (
                        <img
                          key={idx}
                          src={member.img}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                      {team.members.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                          +{team.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Employee Tab */}
          {activeTab === "employee" && (
            <EmployeeTable employees={employeeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
