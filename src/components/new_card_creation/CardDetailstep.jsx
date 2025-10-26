"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

export default function CardDetailsStep({
  nextStep,
  prevStep,
  updateData,
  data,
  employees,
  loadingEmployees,
}) {
  const [enabled, setEnabled] = useState(data.allowTopUps || false);
  const [holderOpen, setHolderOpen] = useState(false);
  const [approverOpen, setApproverOpen] = useState(false);
  const [teamName, setTeamName] = useState(data.teamName || "");

  const holderRef = useRef(null);
  const approverRef = useRef(null);

  const holders = employees;
  const approvers = employees;

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (holderRef.current && !holderRef.current.contains(event.target)) {
        setHolderOpen(false);
      }
      if (approverRef.current && !approverRef.current.contains(event.target)) {
        setApproverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Toggle top-up switch
  const toggleSwitch = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    updateData({ allowTopUps: newValue });
  };

  // ✅ Toggle Card Holder (Multi-select)
  const toggleHolder = (holder) => {
    const exists = data.cardHolder?.includes(holder.name);
    let updatedHolders;
    if (exists) {
      updatedHolders = data.cardHolder.filter((h) => h !== holder.name);
    } else {
      updatedHolders = [...(data.cardHolder || []), holder.name];
    }
    updateData({ cardHolder: updatedHolders });
  };

  // ✅ Toggle Approver (Single-select)
  const toggleApprover = (approver) => {
    updateData({ approver: [approver.name] });
    setApproverOpen(false);
  };

  // ✅ Step validation
  const handleNext = () => {
    if (!data.cardHolder || data.cardHolder.length === 0) {
      toast.error("Please select at least one card holder");
      return;
    }
    if (!data.approver || data.approver.length === 0) {
      toast.error("Please select an approver");
      return;
    }
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    updateData({ teamName: teamName.trim() });
    nextStep();
  };

  return (
    <div className="flex flex-col gap-2 py-4">
      {/* Header */}
      <div className="border-b border-gray-200 flex gap-2 justify-between items-center px-4 py-4">
        <p>Assign Holder & Approver</p>
        <p className="text-[#035638] text-[16px]">Step 2 Of 4</p>
      </div>

      <div className="flex flex-col gap-4 ">
        {/* Team Name */}
        <div className="px-8">
          <label className="block text-sm font-medium mb-1">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#035638]"
          />
        </div>

        {/* Card Holders */}
        <div className="relative px-8 p-2" ref={holderRef}>
          <label className="block text-sm font-medium mb-1">
            Card Holder(s)
          </label>
          <button
            type="button"
            onClick={() => setHolderOpen(!holderOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center bg-white focus:border-[#035638]"
          >
            {data.cardHolder && data.cardHolder.length > 0
              ? data.cardHolder.join(", ")
              : "Select Employee"}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {holderOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {holders.map((holder, idx) => {
                const isChecked = data.cardHolder?.includes(holder.name);
                return (
                  <div
                    key={idx}
                    className="cursor-pointer px-3 py-3 flex items-center hover:bg-gray-100"
                    onClick={() => toggleHolder(holder)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="mr-2 h-4 w-4 text-[#035638]"
                    />
                    <div>
                      <div className="font-medium">{holder.name}</div>
                      <div className="text-xs text-gray-500">
                        {holder.jobTitle} — {holder.department}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Approver */}
        <div className="relative px-8" ref={approverRef}>
          <label className="block text-sm font-medium mb-1">
            Team Leader / Approver
          </label>
          <button
            type="button"
            onClick={() => setApproverOpen(!approverOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center bg-white focus:border-[#035638]"
          >
            {data.approver && data.approver.length > 0
              ? data.approver[0]
              : "Select Approver"}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {approverOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {approvers.map((approver, idx) => {
                const isChecked = data.approver?.includes(approver.name);
                return (
                  <div
                    key={idx}
                    className="cursor-pointer px-3 py-3 flex items-center hover:bg-gray-100"
                    onClick={() => toggleApprover(approver)}
                  >
                    <input
                      type="radio"
                      checked={isChecked}
                      readOnly
                      className="mr-2 h-4 w-4 text-[#035638]"
                    />
                    <div>
                      <div className="font-medium">{approver.name}</div>
                      <div className="text-xs text-gray-500">
                        {approver.jobTitle} — {approver.department}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top-up Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#FCFDF2] rounded-lg shadow-sm">
          <div>
            <p className="text-[#035638] text-base font-medium">
              Allow card holder to request top-ups
            </p>
            <p className="text-[#838794] mt-1 text-base font-normal leading-4">
              Card Holder can request additional funding
            </p>
          </div>
          <button
            onClick={toggleSwitch}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              enabled ? "bg-green-200" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                enabled
                  ? "translate-x-6 bg-[#035638]"
                  : "translate-x-0 bg-white"
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between px-4 pt-6 border-t border-green-900">
          <button
            onClick={prevStep}
            className="px-6 py-2 flex gap-1 items-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
          >
            <ChevronLeft size={14} />
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 flex gap-1 items-center bg-[#035638] text-white rounded-full hover:bg-[#02452e]"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
