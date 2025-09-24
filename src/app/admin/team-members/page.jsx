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
import React, { useState } from "react";

// Modals -------------------------
const AddEmployeeModal = ({ setAddEmployeeModalOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative ">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X
            size={20}
            onClick={() => setAddEmployeeModalOpen(false)}
            className="bg-gray-400 text-black rounded-full p-1"
          />
        </button>
        <div className=" p-4">
          {" "}
          <h2 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-6">
            Add New Employee
          </h2>
          <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-base not-italic font-normal leading-4 mt-1 mb-3">
            Add a new employee to the organization.
          </p>
        </div>

        <form className="space-y-4 px-8 py-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter employee name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Department</label>
            <input
              type="text"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter department"
            />
          </div>
          <div className="flex w-full justify-between gap-2">
            <button
              type="button"
              onClick={() => setAddEmployeeModalOpen(false)}
              className="px-4 py-1  flex-1 border w-[1/2] border-background text-sm rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-[10px] flex gap-2 items-center justify-center  flex-1 bg-background text-sm rounded-full text-white "
            >
              <PlusIcon />
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateTeamModal = ({ setCreateTeamModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative ">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X
            size={20}
            onClick={() => setCreateTeamModal(false)}
            className="bg-gray-400 text-black rounded-full p-1"
          />
        </button>
        <div className=" p-4">
          <h2 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-6">
            Create New Team
          </h2>
          <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-base not-italic font-normal leading-4 mt-1 mb-3">
            Create a new team and set up its initial configuration.
          </p>
        </div>

        <form className="space-y-4 px-8 py-4">
          <div>
            <label className="labelText">Team Name</label>
            <input
              type="text"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="labelText">Description</label>
            <textarea
              className="w-full border outline-none border-gray-200 p-2 rounded-md mt-1"
              rows="3"
              placeholder="Enter team description"
            />
          </div>
          <div>
            <label className="labelText">Budget</label>
            <input
              type="number"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter budget"
            />
          </div>
          <div className="flex w-full  justify-between items-center gap-2">
            <button
              type="button"
              onClick={() => setCreateTeamModal(false)}
              className="px-4 py-[10px] flex-1  border  border-background text-sm rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-[10px]   flex-1  bg-background text-sm rounded-full text-white "
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddMemberModal = ({ setAddMemberModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-4">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X
            size={20}
            onClick={() => setAddMemberModal(false)}
            className="bg-gray-400 text-black rounded-full p-1"
          />
        </button>
        <h2 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-6 ">
          Add Team Member
        </h2>
        <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-base not-italic font-normal leading-4 mt-1 mb-3">
          Add an existing employee to Product Development.
        </p>

        <form className="space-y-4 px-8 py-4">
          <div>
            <label className="labelText">Member Name</label>
            <input
              type="text"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter member name"
            />
          </div>
          <div>
            <label className="labelText">Role</label>
            <input
              type="text"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter role"
            />
          </div>

          <div className="flex w-full  gap-2 ">
            <button
              type="button"
              onClick={() => setAddMemberModal(false)}
              className="px-4 py-1 flex-1  border w-[1/2] border-background text-sm rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-[10px] flex gap-2 items-center justify-center  flex-1  bg-background text-sm rounded-full text-white "
            >
              <PlusIcon />
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Page -------------------------
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

  return (
    <div>
      {/* Show Modals */}
      {addEmployeeModalOpen && (
        <AddEmployeeModal setAddEmployeeModalOpen={setAddEmployeeModalOpen} />
      )}
      {createTeamModal && (
        <CreateTeamModal setCreateTeamModal={setCreateTeamModal} />
      )}
      {addMemberModal && (
        <AddMemberModal setAddMemberModal={setAddMemberModal} />
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
            <User  size={16}/>
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
            teamData.map((team) => (
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
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-gray-500 text-xs">
                        25% used This Month
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
            ))}

          {activeTab === "employee" && (
            <EmployeeTable employees={employeeData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
