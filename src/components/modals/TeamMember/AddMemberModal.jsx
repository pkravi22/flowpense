import { PlusIcon, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddMemberModal = ({
  setAddMemberModal,
  handleAddMember,
  employeeSmallData,
  teamId,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [role, setRole] = useState("");

  // 🔹 Filter only registered employees
  const registeredEmployees =
    employeeSmallData?.filter((emp) => emp.isRegistered) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployeeId) {
      toast.error("Please select an employee before adding.");
      return;
    }

    const employeeId = Number(selectedEmployeeId);

    handleAddMember(employeeId, role, teamId);
    setAddMemberModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-4">
        {/* Close button */}
        <button
          onClick={() => setAddMemberModal(false)}
          className="absolute top-3 right-3 text-gray-500 bg-gray-200 rounded-full p-1 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-[#035638] text-2xl font-medium">Add Team Member</h2>
        <p className="text-[#838794] text-sm mb-3">
          Add an existing employee to Product Development.
        </p>

        {/* 🔹 If no employees registered */}
        {registeredEmployees.length === 0 ? (
          <div className="px-8 py-6 text-center text-gray-500">
            <p className="text-base font-medium">
              No registered employees found.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Employees must register through the app before being added.
            </p>
          </div>
        ) : (
          <form className="space-y-4 px-8 py-4" onSubmit={handleSubmit}>
            {/* Select Employee */}
            <div>
              <label className="labelText block mb-1 font-medium text-gray-700">
                Select Member
              </label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="block w-[200px] max-w-full border border-[#E2E4E9] p-2 rounded-md outline-none text-sm truncate"
              >
                <option value="">Select Employee</option>
                {registeredEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName + " " + emp.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Input */}
            <div>
              <label className="labelText block mb-1 font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-[#E2E4E9] p-2 rounded-md outline-none"
                placeholder="Enter role"
              />
            </div>

            {/* Buttons */}
            <div className="flex w-full gap-2">
              <button
                type="button"
                onClick={() => setAddMemberModal(false)}
                className="px-2 sm:px-4 py-2 flex-1 border text-sm rounded-full border-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 sm:px-4 py-2 flex-1 bg-[#035638] text-white text-sm rounded-full flex items-center justify-center gap-2"
              >
                <PlusIcon size={16} />
                Add Member
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddMemberModal;
