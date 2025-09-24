import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CardDetailsStep({
  nextStep,
  prevStep,
  updateData,
  data,
}) {
  const [enabled, setEnabled] = useState(false);
  const toggleSwitch = () => setEnabled(!enabled);


  const [holderOpen, setHolderOpen] = useState(false);
  const [selectedHolders, setSelectedHolders] = useState([]);

  const [approverOpen, setApproverOpen] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState(null);

  const holders = [
    { name: "John Doe", role: "Software Developer", department: "Engineering" },
    { name: "Jane Smith", role: "Designer", department: "Marketing" },
    { name: "Michael Johnson", role: "Team Lead", department: "Sales" },
  ];

  const approvers = [
    { name: "Alice Brown", role: "Project Manager", department: "Engineering" },
    { name: "Bob White", role: "QA Engineer", department: "Engineering" },
    { name: "Charlie Green", role: "CTO", department: "Engineering" },
  ];

  // Toggle holder selection (multiple allowed)
  const toggleHolder = (holder) => {
    const exists = selectedHolders.find((h) => h.name === holder.name);
    if (exists) {
      setSelectedHolders(selectedHolders.filter((h) => h.name !== holder.name));
    } else {
      setSelectedHolders([...selectedHolders, holder]);
    }
  };

  const toggleApprover = (approver) => {
    setSelectedApprover(approver);
    setApproverOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border-b border-gray-200 flex gap-2 justify-between items-center px-4 py-4">
        <p>Assign Holder & Approver</p>
        <p className="text-[#035638] text-[16px]">Step 1 Of 6</p>
      </div>

      <div className="flex flex-col gap-4 p-8">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Card Holder(s)
          </label>
          <button
            type="button"
            onClick={() => setHolderOpen(!holderOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center bg-white"
          >
            {selectedHolders.length > 0
              ? selectedHolders.map((h) => h.name).join(", ")
              : "Select Employee"}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {holderOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {holders.map((holder, idx) => {
                const isChecked = selectedHolders.some(
                  (h) => h.name === holder.name
                );
                return (
                  <div
                    key={idx}
                    className="cursor-pointer px-3 py-1 flex items-center hover:bg-gray-100"
                    onClick={() => toggleHolder(holder)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">{holder.name}</div>
                      <div className="text-xs text-gray-500">
                        {holder.role} — {holder.department}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Team Leader / Approver
          </label>
          <button
            type="button"
            onClick={() => setApproverOpen(!approverOpen)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 flex justify-between items-center bg-white"
          >
            {selectedApprover ? selectedApprover.name : "Select Approver"}
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {approverOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {approvers.map((approver, idx) => {
                const isChecked = selectedApprover?.name === approver.name;
                return (
                  <div
                    key={idx}
                    className="cursor-pointer px-3 py-1 flex items-center hover:bg-gray-100"
                    onClick={() => toggleApprover(approver)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">{approver.name}</div>
                      <div className="text-xs text-gray-500">
                        {approver.role} — {approver.department}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-[#FCFDF2] rounded-lg shadow-sm">
          <div>
            <p className="text-[color:var(--Foundation-Green-Normal,#035638)] text-base not-italic font-medium leading-[100%]">
              Allow card holder to request top-ups
            </p>
            <p className="text-[color:var(--Neutral-Neutral400,#838794)] mt-1 text-base not-italic font-normal leading-4">
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
              className={` w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                enabled
                  ? "translate-x-6 bg-background"
                  : "translate-x-0 bg-white"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
