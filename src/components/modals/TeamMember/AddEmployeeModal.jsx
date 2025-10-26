"use client";
import { PlusIcon, Loader2, X } from "lucide-react"; // use Loader2 for spinner
import React, { useState } from "react";

const AddEmployeeModal = ({ setAddEmployeeModalOpen, handleAddEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    fullName: "",
    email: "",
    department: "",
    jobTitle: "",
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await handleAddEmployee(employeeData);

      if (success) {
        setAddEmployeeModalOpen(false);
      } else {
        setError("Failed to add employee. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setAddEmployeeModalOpen(false)}
        >
          <X size={20} className="bg-gray-400 text-black rounded-full p-1" />
        </button>

        <div className="p-4">
          <h2 className="text-green-700 text-2xl font-medium">
            Add New Employee
          </h2>
          <p className="text-gray-500 text-base mt-1 mb-3">
            Add a new employee to the organization.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-8 py-4">
          {["fullName", "jobTitle", "email", "department"].map((field) => (
            <div key={field}>
              <label className="text-sm font-medium capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={employeeData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 outline-none rounded-md mt-1"
                placeholder={`Enter ${field}`}
                required
                disabled={loading} // disable while loading
              />
            </div>
          ))}

          <div className="flex w-full justify-between gap-2">
            <button
              type="button"
              onClick={() => setAddEmployeeModalOpen(false)}
              className="px-4 py-2 flex-1 border border-gray-400 text-sm rounded-full"
              disabled={loading} // disable while loading
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-2 md:px-4 py-2 flex gap-2 items-center justify-center flex-1 rounded-full text-white ${
                loading
                  ? "bg-green-800 opacity-70 cursor-not-allowed"
                  : "bg-green-900 hover:bg-green-800"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Adding...
                </>
              ) : (
                <>
                  <PlusIcon size={16} />
                  Add Employee
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
