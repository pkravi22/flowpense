import { CrossIcon } from "lucide-react";
import React from "react";

const CreateTeamModal = ({ setCreateteamModal }) => {
  return (
    <div className="min-h-[200px] z-10 bg-red-400 relative">
      <div
        className="absolute right-4 top-2  "
        onClick={() => setCreateteamModal(false)}
      >
        <CrossIcon />
      </div>
      <div>Employee Modal</div>
    </div>
  );
};

export default CreateTeamModal;
