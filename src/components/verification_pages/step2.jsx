"use client";
import React from "react";

const PrimaryContact = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-[24px] ">Primary Contact / Admin Details</h1>

        <p className="pageSubTitle ">
          Provide details of the primary contact person
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Full Name */}

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="E.g John Doe"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="E.g johndoe@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Select Role</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Owner</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="E.g +1 234 567 890"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryContact;
