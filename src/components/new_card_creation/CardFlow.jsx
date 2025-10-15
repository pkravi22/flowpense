"use client";
import { useEffect, useState } from "react";
import CardTypeStep from "./CardTypeStep";
import CardDetailsStep from "./CardDetailstep";
import ReviewStep from "./ReviewStep";
import SuccessStep from "./SuccessStep";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewSummaryStep from "./ReviewCard";
import { cardServices } from "@/services/cardServices";
import { useSelector } from "react-redux";

export default function CardFlow({ employees, loadingEmployees }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { user, token } = useSelector((state) => state.auth);

  //console.log(employees);
  const [formData, setFormData] = useState({
    cardType: "",
    cardName: "",
    cardHolder: [],
    approver: [],
    teamName: "",
    dailySpendLimit: "",
    weeklySpendLimit: "",
    monthlyLimit: "",
    perTransactionLimit: "",
    cardFunding: 0,
    blockedCategory: [],
    allowTopUps: false,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  console.log(user, token);
  const handleSubmit = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const apiData = {
        cardType: formData.cardType.toLowerCase() + " card",
        cardName: formData.cardName,
        cardHolder: formData.cardHolder,
        approver: formData.approver,
        teamName: formData.teamName,
        dailySpendLimit: Number(formData.dailySpendLimit),
        weeklySpendLimit: Number(formData.weeklySpendLimit),
        monthlyLimit: Number(formData.monthlyLimit),
        perTransactionLimit: Number(formData.perTransactionLimit),
        cardFunding: formData.cardFunding,
        blockedCategory: formData.blockedCategory,
      };

      console.log("Sending to API:", apiData);

      const result = await cardServices.createCard({ apiData, token });
      console.log("result", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to create card");
      }

      console.log("Card Created Successfully:", result);
      nextStep();
    } catch (error) {
      console.error("Error creating card:", error);
      setApiError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex flex-col rounded-2xl">
      {step < 5 && (
        <div className="flex flex-col gap-0 px-4 py-4">
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
            employees={employees}
            loadingEmployees={loadingEmployees}
          />
        )}
        {step === 3 && (
          <ReviewStep
            nextStep={nextStep}
            prevStep={prevStep}
            data={formData}
            updateData={updateData}
          />
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

      {step === 4 && (
        <div className="flex justify-between py-4 border-t-2 border-green-900 px-2">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-[10px] text-sm cursor-pointer min-w-[120px] flex items-center gap-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={step === 4 ? handleSubmit : nextStep}
            className="px-12 py-[10px] bg-background cursor-pointer flex items-center gap-2 text-sm text-white rounded-full hover:bg-background"
          >
            {step === 4 ? "Create Card" : "Next"}
            {step < 4 && <ChevronRight size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}