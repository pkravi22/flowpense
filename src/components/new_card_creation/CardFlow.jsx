"use client";
import { useState } from "react";
import CardTypeStep from "./CardTypeStep";
import CardDetailsStep from "./CardDetailstep";
import ReviewStep from "./ReviewStep";

import SuccessStep from "./SuccessStep";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewSummaryStep from "./ReviewCard";

export default function CardFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cardType: "",
    name: "",
    approver: "",
    currency: "",
    limit: "",
    blocked: "No",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="max-h-screen flex flex-col  rounded-2xl  ">
      {step < 5 && (
        <div className="flex flex-col gap-0 px-4  py-4">
          <h1 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-6">
            Create New Card
          </h1>
          <p className="pageSubTitle mt-1">
            Follow the steps to create and configure a new corporate card
          </p>
        </div>
      )}

      {/* Card content */}
      <div className="w-full max-w-lg bg-white rounded-2xl">
        {step === 1 && (
          <CardTypeStep
            nextStep={nextStep}
            updateData={updateData}
            data={formData}
          />
        )}
        {step === 2 && (
          <CardDetailsStep
            nextStep={nextStep}
            prevStep={prevStep}
            updateData={updateData}
            data={formData}
          />
        )}
        {step === 3 && (
          <ReviewStep nextStep={nextStep} prevStep={prevStep} data={formData} />
        )}
        {step === 4 && (
          <ReviewSummaryStep
            nextStep={nextStep}
            prevStep={prevStep}
            data={formData}
          />
        )}
        {step === 5 && <SuccessStep />}
      </div>

      {step < 5 && (
        <div className="flex justify-between w-full px-4 my-4">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-[10px] text-sm cursor-pointer min-w-[120px] flex items-center gap-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
          ) : (
            <div /> // empty space for alignment
          )}
          <button
            onClick={nextStep}
            className="px-12 py-[10px] bg-background cursor-pointer flex items-center gap-2 text-sm text-white rounded-full hover:bg-background"
          >
            {step === 4 ? "Create Card" : "Next"} {/* ✅ Button changes */}
            {step < 4 && <ChevronRight size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
