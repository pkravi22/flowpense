"use client";
import { Plus, Settings, User } from "lucide-react";
import EmployeeTable from "../../../components/EmployeeTable";
import React, { useEffect, useState } from "react";
import AddEmployeeModal from "@/components/modals/TeamMember/AddEmployeeModal";
import CreateTeamModal from "@/components/modals/TeamMember/CreateTeamModal";
import AddMemberModal from "@/components/modals/TeamMember/AddMemberModal";
import { teamServices } from "@/services/teamServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "@/redux/slices/companySlice";

const Page = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [createTeamModal, setCreateTeamModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  //const [token, setToken] = useState(null);
  const [employeeSmallData, setEmployeeSmallData] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const { company, isLoading, isError, message } = useSelector(
    (state) => state.company
  );
  const dispatch = useDispatch();
  // console.log("company", company);
  const getALLTeams = async () => {
    if (!token) return;
    setLoadingTeams(true);
    try {
      const data = await teamServices.getAllTeams({ token });
      setTeamData(data.data.teams || []);
    } catch (e) {
      console.error("Error fetching teams:", e);
    } finally {
      setLoadingTeams(false);
    }
  };

  const getAllEmployees = async () => {
    if (!token) return;
    setLoadingEmployees(true);
    try {
      const data = await teamServices.getAllEmployees({ token });
      setEmployeeData(data.data.Employee || []);
      console.log(data.data.Employee);
      const smallData = data.data.Employee.map((emp) => ({
        id: emp.id,
        name: emp.fullName,
      }));
      setEmployeeSmallData(smallData);
    } catch (e) {
      console.error("Error fetching employees:", e);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleAddEmployee = async ({ employeeData }) => {
    try {
      const data = await teamServices.addEmployee({
        token,
        employeeData,
      });
      console.log("add employee response", data);
      getALLTeams();
      setAddEmployeeModalOpen(false);
    } catch (e) {
      console.log("error during adding employee to team", e);
    }
  };

  const handleCreateTeam = async ({ teamData }) => {
    try {
      const data = await teamServices.teamCreation({ teamData, token });
      console.log("create team response", data);
      setCreateTeamModal(false);
      getALLTeams();
    } catch (e) {
      console.log("error during creating team", e);
    }
  };

  const handleAddMember = async (employeeId, role, teamId) => {
    console.log("employeeId", employeeId, "role", role, "teamId", teamId);

    try {
      const data = await teamServices.addteamMember({
        token,
        teamId,
        employeeId,
        role,
      });
      console.log("add member response", data.data);

      setAddMemberModal(false);
      getAllEmployees();
      getALLTeams(); // refresh teams after adding member
    } catch (e) {
      toast.error("Failed to add member. Please try again.");
      console.log("error during adding member", e);
    }
  };

  useEffect(() => {
    if (token) {
      getALLTeams();
      getAllEmployees();
      dispatch(fetchCompany({ id: user.companyId, token }));
    }
  }, [token]);

  const teamMembers = company?.users?.filter((user) => {
    return user.role === "EMPLOYEE";
  });
  console.log(teamMembers);

  return (
    <div>
      {/* Modals */}
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
          employeeSmallData={teamMembers}
          teamId={selectedTeamId}
        />
      )}

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

        <div className="mt-4 space-y-4">
          {activeTab === "team" && (
            <>
              {loadingTeams ? (
                <div className="animate-pulse space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 h-32 rounded-lg w-full"
                      ></div>
                    ))}
                  <p className="text-gray-500 text-center">Loading teams...</p>
                </div>
              ) : teamData.length === 0 ? (
                <p className="text-gray-500 text-center">No teams available.</p>
              ) : (
                teamData.map((team) => {
                  const percentage =
                    (parseFloat(team.MonthlyBudget) /
                      parseFloat(team.monthlyLimit)) *
                      100 || 50;
                  return (
                    <div
                      key={team.id}
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-[#020817]">
                            {team.TeamName}
                          </h2>
                          <p className="text-slate-500 text-sm">
                            {team.Description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedTeamId(team.id);
                              setAddMemberModal(true);
                            }}
                            className="flex gap-2 rounded-md text-black border px-4 py-1"
                          >
                            <User />
                            Add Member
                          </button>
                          <button className="border rounded-md px-2">
                            <Settings />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-700">
                        <div className="flex flex-col gap-1">
                          {" "}
                          <p className="font-semibold">Budget Usage</p>{" "}
                          <div className="flex items-center justify-between gap-2">
                            {" "}
                            <p className="text-gray-500 text-xs">
                              Monthly Spent
                            </p>{" "}
                            <span>{team.MonthlyBudget}</span>{" "}
                          </div>{" "}
                          <div className="w-full bg-gray-200 flex items-center rounded-full h-[6px] overflow-hidden">
                            {" "}
                            <div
                              className="bg-[#CED671] h-[4px] rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>{" "}
                          </div>{" "}
                          <div className="flex items-center justify-between gap-2">
                            {" "}
                            <p className="text-gray-500 text-xs">
                              {" "}
                              {percentage.toFixed(0)}% used This Month{" "}
                            </p>{" "}
                            <span>{team.monthlyLimit}</span>{" "}
                          </div>{" "}
                        </div>
                        <div>
                          <p className="font-semibold">Team Size</p>
                          <span className="bg-blue-100 w-[120px] text-center py-1 rounded-3xl block">
                            {team.TotalMembers} Members
                          </span>
                        </div>

                        {/* Created Date */}
                        <div>
                          <p className="font-semibold">Created Date</p>
                          <span>
                            {new Date(team.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold mb-1">Members</p>
                          <div className="flex -space-x-2">
                            {Array.from({ length: team.TotalMembers }).map(
                              (_, idx) => (
                                <img
                                  key={idx}
                                  src="https://randomuser.me/api/portraits/women/44.jpg"
                                  alt={`Member ${idx}`}
                                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                />
                              )
                            )}

                            <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                              +{Math.max(team.TotalMembers - 4, 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* EMPLOYEE TAB */}
          {activeTab === "employee" && (
            <>
              {loadingEmployees ? (
                <div className="animate-pulse">
                  <div className="bg-gray-100 h-8 w-1/3 mb-3 rounded"></div>
                  <div className="bg-gray-100 h-[300px] rounded"></div>
                  <p className="text-gray-500 text-center mt-3">
                    Loading employees...
                  </p>
                </div>
              ) : employeeData.length === 0 ? (
                <p className="text-gray-500 text-center">No employees found.</p>
              ) : (
                <EmployeeTable employees={employeeData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
