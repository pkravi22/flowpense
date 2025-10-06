"use client";
import {
  Cross,
  CrossIcon,
  Plus,
  PlusIcon,
  Settings,
  User,
  X,
} from "lucide-react";
import EmployeeTable from "../../../components/EmployeeTable";
import React, { useEffect, useState } from "react";
import AddEmployeeModal from "@/components/modals/TeamMember/AddEmployeeModal";
import CreateTeamModal from "@/components/modals/TeamMember/CreateTeamModal";
import AddMemberModal from "@/components/modals/TeamMember/AddMemberModal";
import axios from "axios";
import { teamServices } from "@/services/teamServices";

const Page = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [createTeamModal, setCreateTeamModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);

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
      name: "Sales Team",
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
      id: 3,
      name: "Project Management Team",
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
  ];

  const getALLTeams = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await teamServices.getAllTeams({ token });
      console.log("team data", data);
    } catch (e) {
      console.log("error during fetching teams data");
    }
  };

  const handleAddEmployee = async ({ employeeData }) => {
    const token = localStorage.getItem("token");
    try {
      const data = await teamServices.addEmployee({
        token,
        employeeData,
      });
      console.log("add employee response", data);

      // Refresh team data after adding employee
      getALLTeams();
      setAddEmployeeModalOpen(false);
    } catch (e) {
      console.log("error during adding employee to team", e);
    }
  };

  const handleCreateTeam = ({ teamData }) => {
    console.log("teamdata in page", teamData);
    try {
      const token = localStorage.getItem("token");
      const data = teamServices.teamCreation({
        teamData,
        token,
      });

      console.log("create team response", data);
      setCreateTeamModal(false);
      // Refresh team data after creating team
      getALLTeams();
    } catch (e) {
      console.log("error during creating team", e);
    }
  };

  const handleAddMember = (memberId) => {
    try {
    } catch (e) {
      console.log("error during adding member to team", e);
    }

    setAddMemberModal(false);

    getALLTeams();
  };

  useEffect(() => {
    getALLTeams();
  }, []);

  return (
    <div>
      {/* Show Modals */}
      {addEmployeeModalOpen && (
        <AddEmployeeModal
          handleAddEmployee={handleAddEmployee}
          setAddEmployeeModalOpen={setAddEmployeeModalOpen}
        />
      )}
      {createTeamModal && (
        <CreateTeamModal
          handleCreateTeam={handleCreateTeam}
          setCreateTeamModal={setCreateTeamModal}
        />
      )}
      {addMemberModal && (
        <AddMemberModal
          handleAddMember={handleAddMember}
          setAddMemberModal={setAddMemberModal}
        />
      )}

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="pageTitle">Team Management</h1>
          <p className="pageSubTitle mt-2">
            Manage your teams and employees efficiently
          </p>
        </div>
        <div className="flex gap-2">
          <div
            onClick={() => setAddEmployeeModalOpen(true)}
            className="flex w-[200px] items-center flex-1 gap-2 border border-green-600 px-2 py-1 text-sm text-green-600 rounded-full cursor-pointer"
          >
            <User size={16} />
            <span>Add Employee</span>
          </div>
          <div
            onClick={() => setCreateTeamModal(true)}
            className="border flex-1 items-center bg-green-900 px-4 py-1 text-sm text-white flex gap-2 rounded-full cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Team</span>
          </div>
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
          {activeTab === "team" &&
            teamData.map((team) => {
              const spentValue = Number(team.budget.replace(/[^0-9.-]+/g, ""));
              const limitValue = Number(
                team.monthlyLimit.replace(/[^0-9.-]+/g, "")
              );
              const percentage = limitValue
                ? (limitValue / spentValue) * 100
                : 0;
              return (
                <div
                  key={team.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
                >
                  {/* Row 1 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-sans text-[#020817] text-xl font-semibold tracking-[-0.6px]">
                        {team.name}
                      </h2>
                      <p className="text-slate-500 text-[13.563px] leading-5">
                        {team.subheading}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAddMemberModal(true)}
                        className=" flex gap-2  rounded-md  text-black  border  px-4 py-1 "
                      >
                        <User />
                        Add Member
                      </button>
                      <button className=" border rounded-md px-2 ">
                        <Settings />
                      </button>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">Budget Usage</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-gray-500 text-xs">Monthly Spent</p>
                        <span>{team.budget}</span>
                      </div>
                      <div className="w-full bg-gray-200 flex items-center rounded-full h-[6px] overflow-hidden">
                        <div
                          className="bg-[#CED671] h-[4px] rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-gray-500 text-xs">
                          {percentage.toFixed(0)}% used This Month
                        </p>
                        <span>{team.monthlyLimit}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">Team Size</p>
                      <span className="bg-blue-100 w-[120px] text-center py-1 rounded-3xl">
                        {team.size} Members
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">Created Date</p>
                      <span>{team.createdDate}</span>
                    </div>

                    <div className="flex flex-col gap-1">
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
              );
            })}

          {activeTab === "employee" && (
            <EmployeeTable employees={employeeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
