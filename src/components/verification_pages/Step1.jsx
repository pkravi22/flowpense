"use client";
import React from "react";

const BusinessProfile = ({ formData, setFormData }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0">
        <h1 className="text-[24px] ">Business Profile</h1>

        <p className="pageSubTitle">
          Complete your business information for verification
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            Registered Business Name
          </label>
          <input
            type="text"
            placeholder="E.g Acme Corporation"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Trading Name <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="E.g Acme Corporation"
            value={formData.tradingName}
            onChange={(e) =>
              setFormData({ ...formData, tradingName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Business Type
          </label>
          <select
            value={formData.businessType}
            onChange={(e) =>
              setFormData({ ...formData, businessType: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Limited Liability Company</option>
            <option>Sole Proprietorship</option>
            <option>Partnership</option>
            <option>NGO</option>
            <option>Corporation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Industry / Sector <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="E.g Technology"
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Business Registration Number
          </label>
          <input
            type="text"
            placeholder="E.g RC123456"
            value={formData.regNumber}
            onChange={(e) =>
              setFormData({ ...formData, regNumber: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Incorporation Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Incorporation
          </label>
          <input
            type="date"
            value={formData.incorporationDate}
            onChange={(e) =>
              setFormData({ ...formData, incorporationDate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Employees */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Employees
          </label>
          <select
            value={formData.employees}
            onChange={(e) =>
              setFormData({ ...formData, employees: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">E.g 1</option>
            <option>2 - 10</option>
            <option>11 - 100</option>
            <option>101 - 500</option>
            <option>501 - 1000</option>
            <option>1000+</option>
          </select>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Business Website
          </label>
          <input
            type="url"
            placeholder="e.g https://acme.com"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Business Description{" "}
            <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            placeholder="Brief description of your business activities"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows="4"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
