import { CardSim, Info, Wallet, Wallet2Icon } from "lucide-react";

export default function CardTypeStep({ nextStep, updateData, data }) {
  return (
    <div className="">
      <div className="border-b border-gray-200 flex justify-between items-center p-4">
        <p>Card Type and Name</p>
        <p className="text-[#035638] text-[16px]">Step 1 Of 6</p>
      </div>
      <div className="px-8 flex flex-col gap-4 border-b-2 py-12 ">
        <div className="flex gap-4 justify-center items-center  ">
          <div className="w-[200px] h-[120px]  flex items-center justify-center border rounded-2xl ">
            <button
              onClick={() => {
                updateData({ cardType: "Virtual" });
                nextStep();
              }}
              className={`px-4 py-2 flex  gap-1 flex-col justify-center items-center   rounded-lg  text-black text-center text-xl not-italic font-semibold leading-[100%]  ${
                data.cardType === "Virtual" ? "bg-green-600 text-white" : ""
              }`}
            >
              <Wallet />
              Virtual Card
              <p
                className={`text-[color:var(--Neutral-Neutral400,#838794)] text-center text-base not-italic font-normal leading-[100%] ${
                  data.cardType === "Virtual" ? " text-white" : ""
                }`}
              >
                Virtual Issuance
              </p>
            </button>
          </div>
          <div className="w-[200px] h-[120px]  flex items-center justify-center border rounded-2xl  ">
            <button
              onClick={() => {
                updateData({ cardType: "Physical" });
                nextStep();
              }}
              className={`px-4 py-2 text-black/40 gap-1 flex  flex-col justify-center  items-center text-center text-xl not-italic font-semibold leading-[100%]  ${
                data.cardType === "Physical" ? "bg-green-600 text-white" : ""
              }`}
            >
              <Wallet />
              Physical Card
              <p
                className={`text-[color:var(--Neutral-Neutral400,#838794)] text-center text-base not-italic font-normal leading-[100%] ${
                  data.cardType === "Physical" ? " text-white" : ""
                }`}
              >
                Physical Issuance
              </p>
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Card Name</label>
          <input
            type="text"
            placeholder="e.g John Travel Card,Marketing Team Card"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
          />
          <div className="text-[color:var(--Neutral-600,#475467)] flex items-center  gap-1 my-1 text-xs not-italic font-normal leading-[160%]">
            <Info size={12} />
            This name will appear on the card and in statements
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
