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
  console.log(employeeSmallData);
  console.log("teamId", teamId);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployeeId) {
      toast.error("Please select an employee before adding.");
      return;
    }
    const employeeId = Number(selectedEmployeeId);

    console.log("Selected Employee ID:", employeeId);
    console.log("Selected Role:", role);
    // 🔹 Pass selected employee ID and role to parent
    handleAddMember(employeeId, role, teamId);
    setAddMemberModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-lg p-4">
        {/* Close button */}
        <button
          onClick={() => setAddMemberModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-[#035638] text-2xl font-medium">Add Team Member</h2>
        <p className="text-[#838794] text-sm mb-3">
          Add an existing employee to Product Development.
        </p>

        <form className="space-y-4 px-8 py-4" onSubmit={handleSubmit}>
          <div>
            <label className="labelText block mb-1 font-medium text-gray-700">
              Select Member
            </label>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="w-full border border-[#E2E4E9] p-2 rounded-md outline-none"
            >
              <option value="">Select Employee </option>
              {employeeSmallData?.map((emp) => (
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

          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={() => setAddMemberModal(false)}
              className="px-2  sm:px-4 py-2 flex-1 border text-sm rounded-full border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2  sm:px-4 py-2 flex-1 bg-[#035638] text-white text-sm rounded-full flex items-center justify-center gap-2"
            >
              <PlusIcon size={16} />
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
