"use client";

import { useEffect, useState } from "react";
import BusinessProfile from "./Step1";
import PrimaryContact from "./step2";
import ComplianceVerification from "./Step3";
import BankingInfo from "./Step4";
import {
  ChevronLeft,
  ChevronRight,
  ClosedCaptionIcon,
  Cross,
  X,
} from "lucide-react";
import axios from "axios";
import { authService } from "@/services/authServices";

import { companyServices } from "@/services/companyServices";
import { useSelector } from "react-redux";
const VerifyAccount = ({
  nComplete,
  onCancel,
  getCompanyDetails,
  setVerified,
}) => {
  const [step, setStep] = useState(1);
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    businessName: "",
    tradingName: "",
    businessType: "",
    industry: "",
    regNumber: "",
    incorporationDate: "",
    employees: "",
    website: "",
    description: "",
    fullName: "",
    email: "",
    role: "",

    phone: "",
    tin: "",
    cac: "",
    vat: "",
    bvn: "",
    cacFile: null,
    utility1: null,
    utility2: null,
    bankStatement: null,
    bank: "",
    bankCode: "",
    accountNumber: "",
    currency: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const registerCompany = async () => {
    try {
      const formDataToSend = new FormData();

      // Map frontend field names to backend expected field names
      // Required fields
      formDataToSend.append("companyId", user?.companyId?.toString() || "");
      formDataToSend.append("adminBvn", formData.bvn || "");
      formDataToSend.append("accountNumber", formData.accountNumber || "");
      formDataToSend.append("bankCode", formData.bankCode || "");

      // Business Profile fields
      formDataToSend.append(
        "registeredCompanyName",
        formData.businessName || ""
      );
      formDataToSend.append("TradingName", formData.tradingName || "");
      formDataToSend.append("BusinessType", formData.businessType || "");
      formDataToSend.append("Industry", formData.industry || "");
      formDataToSend.append("RegisteredNo", formData.regNumber || "");
      formDataToSend.append("DateofInc", formData.incorporationDate || "");
      formDataToSend.append("EmployeeNo", formData.employees || "");
      formDataToSend.append("Website", formData.website || "");
      formDataToSend.append("Description", formData.description || "");

      // Primary Contact fields
      formDataToSend.append("FullName", formData.fullName || "");
      formDataToSend.append("Email", formData.email || "");
      formDataToSend.append("Role", formData.role || "");
      formDataToSend.append("PhoneNo", formData.phone || "");

      // Compliance fields
      formDataToSend.append("TIN", formData.tin || "");
      formDataToSend.append("VAT", formData.vat || "");
      formDataToSend.append("CAC", formData.cac || "");

      // Banking fields
      formDataToSend.append("BankName", formData.bank || "");
      formDataToSend.append("Currency", formData.currency || "");

      // Required by backend
      formDataToSend.append("reviewerId", "2"); // Hardcoded as in your working example

      // FILES - ALL must be appended with field name 'docs' (not individual field names)
      const fileFields = [
        "utility1",
        "utility2",
        "bankStatementPdf",
        "cacFile",
      ];
      fileFields.forEach((field) => {
        if (formData[field] instanceof File) {
          formDataToSend.append("docs", formData[field]); // Use 'docs' as field name for ALL files
        }
      });

      console.log("Sending KYC data with correct field mapping...");

      const data = await companyServices.uploadKYC({
        formData: formDataToSend,
        token,
      });
      if (data?.success || data?.status === "success") {
        toast.success(" Company registered with KYC successfully!");
      }
      await getCompanyDetails();
      setVerified(true);

      return data;
    } catch (e) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        " Failed to register company. Please try again.";

      toast.error(errorMsg);
      throw e;
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-3xl max-h-[86vh] flex flex-col">
      <div className="border-b relative border-gray-200 p-4 flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="topHeading1">Verify Account</h1>

          <p className="pageSubTitle mt-2">
            You need to verify your business account to get full access.
          </p>
        </div>
        <div className="min-w-[50px] bg-[#035638]  rounded-full flex justify-center items-center">
          <p className=" text-[#E5EE7D] px-1 md:px-4 py-1 text-sm ">
            Step {step} of 4
          </p>
        </div>
        <div
          className="absolute -top-2 right-0 bg-gray-200  rounded-full"
          onClick={onCancel}
        >
          <X size={24} />
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {step === 1 && (
          <BusinessProfile formData={formData} setFormData={setFormData} />
        )}
        {step === 2 && (
          <PrimaryContact formData={formData} setFormData={setFormData} />
        )}
        {step === 3 && (
          <ComplianceVerification
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <BankingInfo
            formData={formData}
            setFormData={setFormData}
            registerCompany={registerCompany}
          />
        )}
      </div>

      <div className="flex justify-between p-4 border-t border-gray-200">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-white flex items-center px-4 gap-2 py-1 rounded-full border border-[#035638]  text-[#035638]"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="bg-[#035638] flex gap-2 items-center text-white px-6 py-2 rounded-full"
          >
            Next
            <ChevronRight size={12} />
          </button>
        ) : (
          <button
            onClick={() => {
              registerCompany();
              onComplete();
            }}
            className="bg-background cursor-pointer flex gap-2 items-center text-white px-4 py-1 rounded-full"
          >
            Submit for Verification
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
