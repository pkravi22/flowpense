"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Download,
  MoreVertical,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const base = "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap";
  const map = {
    Completed: "bg-lime-100 text-lime-700",
    Pending: "bg-gray-200 text-gray-700",
    Declined: "bg-rose-100 text-rose-600",
  };
  return <span className={`${base} ${map[status] || ""}`}>{status}</span>;
};

export default function TransactionTable({ expenseData: transactions }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Categories
  console.log(transactions);
  const categories = useMemo(() => {
    const set = new Set(transactions.map((t) => t.category || ""));
    return ["All", ...Array.from(set)];
  }, [transactions]);

  // Filtered & searched rows
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return transactions.filter((t) => {
      const hit =
        t.merchant?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.cardHolder?.toLowerCase().includes(q) ||
        t.cardDetails?.toLowerCase().includes(q) ||
        String(t.amount).includes(q);

      const statusOk = status === "All" ? true : t.status === status;
      const catOk = category === "All" ? true : t.category === category;
      return hit && statusOk && catOk;
    });
  }, [transactions, query, status, category]);

  // Pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);
  const pageRows = filtered.slice(start, end);

  useEffect(() => setPage(1), [query, status, category, rowsPerPage]);

  const formatMoney = (n) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);

  const exportCSV = () => {
    const cols = [
      "Date",
      "Merchant",
      "Category",
      "Card Details",
      "Card Holder",
      "Amount",
      "Status",
    ];
    const lines = [
      cols.join(","),
      ...filtered.map((t) =>
        [
          t.date || "",
          t.merchant || "",
          t.category || "",
          t.cardDetails || "",
          t.cardHolder || "",
          t.amount || 0,
          t.status || "",
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const PageButton = ({ p, active = false }) => (
    <button
      onClick={() => goTo(p)}
      className={`h-8 min-w-8 px-2 rounded-md text-sm ${
        active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
      }`}
    >
      {p}
    </button>
  );

  const renderPages = () => {
    const items = [];
    const add = (p) =>
      items.push(<PageButton key={p} p={p} active={p === safePage} />);
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return items;
    }
    add(1);
    if (safePage > 4)
      items.push(
        <span key="el1" className="px-2">
          …
        </span>
      );
    const startP = Math.max(2, safePage - 1);
    const endP = Math.min(totalPages - 1, safePage + 1);
    for (let i = startP; i <= endP; i++) add(i);
    if (safePage < totalPages - 3)
      items.push(
        <span key="el2" className="px-2">
          …
        </span>
      );
    add(totalPages);
    return items;
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Search & Filter */}
      <div className="flex flex-col gap-3 md:flex-row items-center md:justify-between">
        {/* LEFT: Search + Filter */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search here..."
              className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilter((s) => !s)}
              className="h-10 px-3 rounded-lg border border-gray-300 flex items-center gap-2 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
            {showFilter && (
              <div className="absolute z-20 mt-2 w-56 rounded-lg border bg-white shadow-lg p-3">
                <label className="text-xs text-gray-500">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full h-9 border rounded-md px-2"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Status + Export */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 pl-3 pr-8 rounded-lg border border-gray-300 appearance-none bg-white"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          <button
            onClick={exportCSV}
            className="h-10 px-3 rounded-lg bg-lime-200 text-gray-900 border border-lime-300 flex items-center gap-2 hover:bg-lime-300"
          >
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-3 min-h-[100px] w-[360px] sm:w-[500px] md:w-[600px] lg:min-w-[1000px] overflow-auto">
        <table className="min-w-full text-sm border-1 border-l-gray-300 ">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="text-left text-sm font-medium text-gray-600">
              <th className="p-3">Date</th>
              <th className="p-3">Merchant</th>
              <th className="p-3">Category</th>
              <th className="p-3">Card Details</th>
              <th className="p-3">Card Holder</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {pageRows.length > 0 ? (
              pageRows.map((t) => (
                <tr
                  key={t.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3 whitespace-nowrap">{t.date}</td>
                  <td className="p-3 whitespace-nowrap">{t.merchant}</td>
                  <td className="p-3 whitespace-nowrap">{t.category}</td>
                  <td className="p-3 whitespace-nowrap">{t.cardDetails}</td>
                  <td className="p-3 whitespace-nowrap">{t.cardHolder}</td>
                  <td className="p-3 whitespace-nowrap">
                    {formatMoney(t.amount)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-3">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="h-9 border rounded-md px-2"
            >
              {[10, 20, 30, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <span>
            Showing {total === 0 ? 0 : start + 1} to {end} of{" "}
            {total.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => goTo(safePage - 1)}
            disabled={safePage === 1}
            className="h-8 px-3 rounded-md border disabled:opacity-50 hover:bg-gray-50"
          >
            Prev
          </button>
          {renderPages()}
          <button
            onClick={() => goTo(safePage + 1)}
            disabled={safePage === totalPages}
            className="h-8 px-3 rounded-md border disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
