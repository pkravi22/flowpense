import { Wallet } from "lucide-react";

export default function SuccessStep() {
  return (
    <div className="text-center ">
      <div className="flex flex-col gap-1 justify-center items-center py-8">
        <Wallet size={48} />
        <h2 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-">
          Card Created Successfully
        </h2>
        <p className="text-gray-600">
          You can now view card details or fund the card.
        </p>
      </div>
      <div className="w-full flex justify-between items-center border-t  py-4 px-4">
        <button className="rounded-full border border-[#035638] text-[#035638]  px-4 py-1">
          Go To Card Details
        </button>
        <button className="bg-background rounded-full px-4 py-1 text-white">
          Fund card
        </button>
      </div>
    </div>
  );
}
