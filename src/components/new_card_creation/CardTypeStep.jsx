import { CardSim, Info, Wallet, Wallet2Icon } from "lucide-react";
import { useState } from "react";

export default function CardTypeStep({ nextStep, updateData, data }) {
  const [cardName, setCardName] = useState(data.cardName || "");

  const handleCardTypeSelect = (type) => {
    if (type === "Physical") {
      alert("Physical cards coming soon!");
      return;
    }
    updateData({ cardType: type });
  };

  const handleNext = () => {
    if (!data.cardType) {
      alert("Please select a card type");
      return;
    }
    if (!cardName.trim()) {
      alert("Please enter a card name");
      return;
    }
    updateData({ cardName: cardName.trim() });
    nextStep();
  };

  return (
    <div className="">
      <div className="border-b border-gray-200 flex justify-between items-center p-4">
        <p>Card Type and Name</p>
        <p className="text-[#035638] text-[16px]">Step 1 Of 4</p>
      </div>
      <div className="px-8 flex flex-col gap-4 border-b-2 py-12">
        <div className="flex gap-4 justify-center items-center">
          {/* Virtual Card */}
          <div className="w-[200px] h-[120px] flex items-center justify-center border rounded-2xl">
            <button
              onClick={() => handleCardTypeSelect("Virtual")}
              className={`px-4 py-2 flex gap-1 flex-col justify-center items-center rounded-lg text-black text-center text-xl not-italic font-semibold leading-[100%] w-full h-full ${
                data.cardType === "Virtual"
                  ? "bg-[#035638] text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <Wallet />
              Virtual Card
              <p
                className={`text-center text-base not-italic font-normal leading-[100%] ${
                  data.cardType === "Virtual"
                    ? "text-white"
                    : "text-[color:var(--Neutral-Neutral400,#838794)]"
                }`}
              >
                Virtual Issuance
              </p>
            </button>
          </div>

          {/* Physical Card */}
          <div className="w-[200px] h-[120px] flex items-center justify-center border rounded-2xl">
            <button
              onClick={() => handleCardTypeSelect("Physical")}
              className={`px-4 py-2 flex gap-1 flex-col justify-center items-center rounded-lg text-center text-xl not-italic font-semibold leading-[100%] w-full h-full ${
                data.cardType === "Physical"
                  ? "bg-[#035638] text-white"
                  : "text-black/40 hover:bg-gray-50"
              }`}
            >
              <Wallet />
              Physical Card
              <p
                className={`text-center text-base not-italic font-normal leading-[100%] ${
                  data.cardType === "Physical"
                    ? "text-white"
                    : "text-[color:var(--Neutral-Neutral400,#838794)]"
                }`}
              >
                Physical Issuance
              </p>
              {data.cardType !== "Physical" && (
                <span className="text-xs text-orange-500 mt-1">
                  Coming Soon
                </span>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Card Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="e.g John Travel Card, Marketing Team Card"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#035638]"
          />
          <div className="text-[color:var(--Neutral-600,#475467)] flex items-center gap-1 my-1 text-xs not-italic font-normal leading-[160%]">
            <Info size={12} />
            This name will appear on the card and in statements
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleNext}
            disabled={!data.cardType || !cardName.trim()}
            className="px-6 py-2 bg-[#035638] text-white rounded-full hover:bg-[#02452e] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}