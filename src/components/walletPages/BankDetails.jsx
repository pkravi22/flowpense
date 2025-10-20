import { bankServices } from "@/services/bankServices";
import { PlusIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BankDetails = ({ bankModalOpen, setBankModalOpen }) => {
  const [formData, setFormData] = useState({
    AccountNumber: "",
    country: "",
    BankCode: "",
  });
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formData", formData);
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
      const payload = {
        formData,
      };
      console.log(formData);
      const response = await bankServices.addBankAccount({ formData, token });

      if (response.success) {
        closeModal();
        setBankModalOpen(false);
        toast.success("Bank account added successfully");
        setFormData({ AccountNumber: "", country: "", BankCode: "" });
        //router.push(response.authorization_url);
      } else {
        toast.error("Failed to add funds: " + response.message);
      }
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setBankModalOpen(false);
    }
  };

  const getUSerBankAccounts = async () => {
    try {
      const response = await bankServices.getUserBankAccount({ token });
      console.log("user bank accounts", response);
    } catch (error) {
      console.error("Error fetching user bank accounts:", error);
    }
  };

  return (
    <div className="flex flex-col p-3 min-h-[430px] rounded-2xl shadow-md gap-2">
      <div className="text-2xl font-[600]"> Bank Details</div>
      <div className="flex items-center justify-between p-2">
        {" "}
        <div className="flex flex-col ">
          <p>Guaranty Trust Bank</p>
          <p>****2323</p>
        </div>
        <div className="border border-green-300 px-4 py-1 text-sm  text-green-400 rounded-full">
          <p>Verified</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-2 ">
        {" "}
        <div className="flex flex-col ">
          <p>First Bank of Nigeria</p>
          <p>****3242</p>
        </div>
        <div className="border border-green-300 px-4 py-1 text-sm  text-green-400 rounded-full">
          <p>Verified</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-2">
        {" "}
        <div className="flex flex-col ">
          <p>United Bank for Africa</p>
          <p>****2323</p>
        </div>
        <div className="border border-orange-300 px-4 py-1 text-sm  text-orange-400 rounded-full">
          <p>Pending</p>
        </div>
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
              <p className="text-[#838794] text-[16px]"></p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Code
                </label>
                <select
                  name="BankCode"
                  value={formData.BankCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 p-2 rounded"
                >
                  <option value="">Select Bank Code</option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
              </div>

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
