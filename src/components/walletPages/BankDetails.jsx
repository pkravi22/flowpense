import { bankServices } from "@/services/bankServices";
import { PlusIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BankDetails = ({ bankModalOpen, setBankModalOpen, userBankAccounts }) => {
  const [formData, setFormData] = useState({
    AccountNumber: "",
    country: "",
    BankCode: "",
  });

  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [allBanks, setAllBanks] = useState([]);
  console.log("userBankAccounts", userBankAccounts);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.AccountNumber || !formData.country || !formData.BankCode) {
      toast.error("Please fill all fields");
      return;
    }

    if (!user || !token) {
      toast.error("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await bankServices.addBankAccount({ formData, token });

      toast.success("Bank added successfully");
    } catch (error) {
      console.error("Error adding bank:", error);
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllBanks = async () => {
    if (!user || !token) return;
    setLoading(true);
    try {
      const response = await bankServices.getAllBanks();
      setAllBanks(response.data.banks || []);

      console.log("All Banks:", response.data.banks);
    } catch (error) {
      console.error("Error fetching banks:", error);
      toast.error("Failed to load bank list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBanks();
  }, [user, token]);

  return (
    <div className="flex flex-col p-3 min-h-[430px] rounded-2xl shadow-md gap-2">
      <div className="text-2xl font-[600]"> Bank Details</div>

      <div className="flex flex-col w-full mt-3">
        {userBankAccounts && userBankAccounts.length > 0 ? (
          userBankAccounts.map((bank) => (
            <div
              key={bank.id || bank.AccountNumber}
              className="flex justify-between items-center  p-3 mb-3 bg-gray-50  hover:shadow-md transition-all duration-200"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  <span className="text-[#035638]">{bank.BankCode}</span>
                </p>
                <p className="text-sm text-gray-600">{bank.AccountNumber}</p>
              </div>

              <div className="border border-green-300 px-3 py-1 text-xs text-green-700 rounded-full font-medium">
                Verified
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm italic text-center py-4">
            No bank accounts added yet.
          </div>
        )}
      </div>

      <div
        className="text-sm text-black border mt-4 border-black rounded-sm text-center py-1 cursor-pointer"
        onClick={() => setBankModalOpen(true)}
      >
        + Add New Bank Account
      </div>

      {bankModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setBankModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <div className="mb-4">
              <h2 className="text-[24px] text-[#035638]">Add Bank Account</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Bank
                </label>
                <select
                  name="BankCode"
                  value={formData.BankCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 p-2 rounded"
                >
                  <option value="">Select Bank</option>
                  {allBanks.map((bank, index) => (
                    <option key={index} value={bank.code || bank.BankCode}>
                      {bank.name || bank.BankName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter Country"
                  className="w-full border border-gray-200 p-2 rounded"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="AccountNumber"
                  value={formData.AccountNumber}
                  onChange={handleInputChange}
                  placeholder="12123456"
                  className="w-full border border-gray-200 p-2 rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 flex-1 rounded-full bg-gray-200"
                  onClick={() => setBankModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 flex flex-1 items-center gap-2 rounded-full bg-[#035638] text-white"
                  disabled={loading}
                >
                  {loading ? (
                    "Adding bank Account..."
                  ) : (
                    <>
                      <PlusIcon size={16} /> Add Bank Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDetails;
