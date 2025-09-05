"use client";
import React, { useMemo, useState } from "react";
import { CSVLink } from "react-csv";

const EmployeeTable = ({ employees }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Columns we want to display
  const columns = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Department",
    "Status",
    "Date Joined",
  ];

  // Filtered employees based on search
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      Object.values(emp).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md px-3 py-1 w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CSVLink
          data={filteredEmployees}
          filename={"employees.csv"}
          className="bg-green-500 text-white px-4 py-1 rounded-md text-sm"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="p-3 border-b border-gray-200">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{emp.id}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">{emp.department || emp.role}</td>
                <td className="p-3">{emp.status || "Active"}</td>
                <td className="p-3">{emp.dateJoined || "01 Jan, 2025"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3">
        <p>
          Showing {indexOfFirstRow + 1} to{" "}
          {Math.min(indexOfLastRow, filteredEmployees.length)} of{" "}
          {filteredEmployees.length} entries
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span className="px-2 py-1">{currentPage}</span>
          <button
            className="px-3 py-1 border rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
