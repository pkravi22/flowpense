"use client";
import { CrossIcon, PlusIcon, X } from "lucide-react";
import React, { useState } from "react";

const AddEmployeeModal = ({ setAddEmployeeModalOpen, handleAddEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    employeeId: 6,
    fullName: "",
    email: "",
    departement: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employeeData);
    handleAddEmployee({ employeeData });
    setAddEmployeeModalOpen(false);
  };
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

        <form onSubmit={handleSubmit} className="space-y-4 px-8 py-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="fullName"
              value={employeeData.fullName}
              onChange={handleChange}
              className="w-full border border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter employee name"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="jobTitle"
              value={employeeData.jobTitle}
              onChange={handleChange}
              className="w-full border border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter Job title"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Department</label>
            <input
              type="text"
              name="departement"
              value={employeeData.departement}
              onChange={handleChange}
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter department"
              required
            />
          </div>

          <div className="flex w-full justify-between gap-2">
            <button
              type="button"
              onClick={() => setAddEmployeeModalOpen(false)}
              className="px-4 py-1 flex-1 border border-background text-sm rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-[10px] flex gap-2 items-center justify-center flex-1 bg-background text-sm rounded-full text-white cursor-pointer"
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

export default AddEmployeeModal;
