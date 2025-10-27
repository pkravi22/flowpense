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
          <label className="block text-sm font-medium mb-1">CAC Number </label>

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
          <label className="block text-sm font-medium mb-1">Active BVN </label>

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
          {[1, 2].map((num) => (
            <div key={num} className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                Utility Bill {num}
              </label>

              {/* Clickable upload area */}
              <div
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-36 cursor-pointer hover:border-green-600 transition-colors relative"
                onClick={() => document.getElementById(`utility${num}`).click()}
              >
                <Upload className="text-gray-400 text-4xl mb-2" />

                <span className="text-sm font-medium mb-1 text-center">
                  Click to upload file
                </span>

                <span className="text-xs text-gray-500 mb-2 text-center">
                  PDF, PNG, JPG — Max 10MB
                </span>

                {/* Hidden file input */}
                <input
                  type="file"
                  id={`utility${num}`}
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`utility${num}`]: e.target.files[0],
                    })
                  }
                />

                {/* Show selected file name */}
                {formData[`utility${num}`] && (
                  <span className="text-sm text-gray-700 mt-2 text-center truncate w-full">
                    {formData[`utility${num}`].name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[
            {
              label: "Recent Bank Statement (PDF)",
              field: "bankStatementPdf",
              accept: ".pdf,.png,.jpg",
            },
            {
              label: "CAC Certificate",
              field: "cacFile",
              accept: ".pdf,.png,.jpg",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="block text-sm font-medium mb-2">
                {item.label}
              </label>

              <div
                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-36 cursor-pointer hover:border-green-600 transition-colors relative"
                onClick={() => document.getElementById(item.field).click()}
              >
                <Upload className="text-gray-400 text-4xl mb-2" />

                <span className="text-sm font-medium mb-1 text-center">
                  Click to upload file
                </span>

                <span className="text-xs text-gray-500 mb-2 text-center">
                  PDF, PNG, JPG — Max 10MB
                </span>

                <input
                  type="file"
                  accept={item.accept}
                  id={item.field}
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [item.field]: e.target.files[0],
                    })
                  }
                />

                {formData[item.field] && (
                  <span className="text-sm text-gray-700 mt-2 text-center truncate w-full">
                    {formData[item.field].name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceVerification;
