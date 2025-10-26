import { CrossIcon, X, } from "lucide-react";
import React, { useState } from "react";

const CreateTeamModal = ({ setCreateTeamModal, handleCreateTeam }) => {
  const [teamData, setTeamData] = React.useState({
    TeamName: "",
    Description: "",
    MonthlyBudget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeamData({
      ...teamData,
      [name]: name === "MonthlyBudget" ? Number(value) : value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleCreateTeam({ teamData });
      setCreateTeamModal(false);
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative ">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X
            size={20}
            onClick={() => setCreateTeamModal(false)}
            className="bg-gray-400 text-black rounded-full p-1"
          />
        </button>
        <div className=" p-4">
          <h2 className="text-[color:var(--Foundation-Green-Normal,#035638)] text-2xl not-italic font-medium leading-6">
            Create New Team
          </h2>
          <p className="text-[color:var(--Neutral-Neutral400,#838794)] text-base not-italic font-normal leading-4 mt-1 mb-3">
            Create a new team and set up its initial configuration.
          </p>
        </div>

        <form className="space-y-4 px-8 py-4" onSubmit={handleSubmit}>
          <div>
            <label className="labelText">Team Name</label>
            <input
              type="text"
              name="TeamName"
              value={teamData.TeamName}
              onChange={handleChange}
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="labelText">Description</label>
            <textarea
              className="w-full border outline-none border-gray-200 p-2 rounded-md mt-1"
              rows="3"
              placeholder="Enter team description"
              name="Description"
              value={teamData.Description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="labelText">Budget</label>
            <input
              type="number"
              className="w-full border outline-none border-[#E2E4E9] p-2 rounded-md mt-1"
              placeholder="Enter budget"
              name="MonthlyBudget"
              value={teamData.MonthlyBudget}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full  justify-between items-center gap-2">
            <button
              type="button"
              onClick={() => setCreateTeamModal(false)}
              className="px-4 py-[10px] flex-1  border  border-background text-sm rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-[10px]  cursor-pointer  flex-1  bg-background text-sm rounded-full text-white "
            >
              {loading ? "Creating Team.." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
