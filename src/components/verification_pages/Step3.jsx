"use client";
import React, { useState } from "react";
import { Upload, FileText } from "lucide-react"; // icons

const ComplianceVerification = ({ formData, setFormData }) => {
  const [status, setStatus] = useState({
    tin: "Unverified",
    cac: "Unverified",
    vat: "Unverified",
    bvn: "Unverified",
  });

  const handleVerify = (field) => {
    // Demo: simply mark as Verified
    setStatus((prev) => ({ ...prev, [field]: "Verified" }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0">
        <h1 className="text-[24px] ">Compliance & Verification</h1>

        <p className="pageSubTitle ">
          Enter ID Number & upload documents for Business Verification
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* TIN */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            Tax Identification Number (TIN){" "}
            <span className="text-xs text-gray-500 mt-1">{status.tin}</span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="E.g TIN123456"
              value={formData.tin}
              onChange={(e) =>
                setFormData({ ...formData, tin: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* CAC */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            CAC Number{" "}
            <span className="text-xs text-gray-500 mt-1">{status.cac}</span>
          </label>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="E.g CAC123456"
              value={formData.cac}
              onChange={(e) =>
                setFormData({ ...formData, cac: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* VAT */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            VAT Registered Number{" "}
            <span className="text-gray-400">(Optional)</span>{" "}
            <span className="text-xs text-gray-500 mt-1">{status.vat}</span>
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="E.g VAT123456"
              value={formData.vat}
              onChange={(e) =>
                setFormData({ ...formData, vat: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* BVN */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            Active BVN{" "}
            <span className="text-xs text-gray-500 mt-1">{status.bvn}</span>
          </label>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="E.g 12345678901"
              value={formData.bvn}
              onChange={(e) =>
                setFormData({ ...formData, bvn: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Utility Bill 1
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-4 h-28 cursor-pointer">
              <FileText className="text-gray-500 mr-3" />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, utility1: e.target.files[0] })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Utility Bill 2
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-4 h-28 cursor-pointer">
              <FileText className="text-gray-500 mr-3" />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, utility2: e.target.files[0] })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col"></div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Recent Bank Statement (PDF)
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-4 h-28 cursor-pointer">
              <Upload className="text-gray-500 mr-3" />
              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankStatementPdf: e.target.files[0],
                  })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className=" flex flex-col">
            <label className="block text-sm font-medium mb-1">
              CAC Certificate
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-4 h-28 cursor-pointer">
              <Upload className="text-gray-500 mr-3" />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, cacFile: e.target.files[0] })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceVerification;
