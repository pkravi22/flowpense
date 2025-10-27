"use client";
import { Download } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const EmployeeTable = ({ employees = [] }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;

    return employees.filter((emp) => {
      const parts = [
        emp.id,
        emp.fullName,
        emp.email,
        emp.jobTitle,
        emp.department,
        emp.company?.name,
        emp.company?.country,
        emp.company?.kycStatus,
        emp.company?.walletBalance?.toString?.(),
      ];
      const searchable = parts
        .filter(Boolean)
        .map((p) => String(p).toLowerCase())
        .join(" ");
      return searchable.includes(q);
    });
  }, [employees, search]);

  const totalRows = filteredEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredEmployees.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage]);

  const showingFrom = totalRows === 0 ? 0 : indexOfFirstRow + 1;
  const showingTo = Math.min(indexOfLastRow, totalRows);

  const csvData = filteredEmployees.map((emp) => ({
    ID: emp.id,
    "Full Name": emp.fullName,
    Email: emp.email,
    Department: emp.department,
    "Job Title": emp.jobTitle,
    Company: emp.company?.name || "-",
    Country: emp.company?.country || "-",
    "KYC Status": emp.company?.kycStatus || "-",
    "Wallet Balance":
      emp.company?.walletBalance != null ? emp.company.walletBalance : "-",
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full min-w-[360px] overflow-x-auto">
      <div className="flex flex-row justify-between items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md px-3 py-1 w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CSVLink
          data={csvData}
          filename={"employees.csv"}
          className="border flex gap-1 items-center text-black px-4 py-1 rounded-md text-sm whitespace-nowrap"
        >
          <Download size={14} />
          Export CSV
        </CSVLink>
      </div>

      <div className="mt-3 h-[500px] w-[330px] sm:w-full ">
        <table className="min-w-[300px] text-sm border-1 border-l-gray-30 overflow-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Full Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Department</th>
              <th className="p-3 font-semibold">Job Title</th>
              <th className="p-3 font-semibold">Company</th>
              <th className="p-3 font-semibold">Country</th>
              <th className="p-3 font-semibold">KYC Status</th>
              <th className="p-3 font-semibold">Wallet Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-4 text-gray-500">
                  No results found
                </td>
              </tr>
            ) : (
              currentRows.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-300 last:border-b-1 font-sans"
                >
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-sans leading-[160%]">
                    {emp.id}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-sans leading-[160%]">
                    {emp.fullName}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-sans leading-[160%]">
                    {emp.email}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.department}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.jobTitle}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.company?.name || "-"}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.company?.country || "-"}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.company?.kycStatus || "-"}
                  </td>
                  <td className="p-3 text-[color:var(--Grey-700,#344054)] text-base not-italic font-normal leading-[160%]">
                    {emp.company?.walletBalance != null
                      ? emp.company.walletBalance
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-2 sm:gap-0">
        <p>
          Showing {showingFrom} to {showingTo} of {totalRows} entries
        </p>
        <div className="flex gap-2 items-center">
          <label className="text-sm mr-2">Rows:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 mr-4"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>

          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Prev
          </button>
          <span className="px-2 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            disabled={currentPage === totalPages || totalRows === 0}
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
