"use client";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

export default function BusinessVerification() {
  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobileNumber: "",
      fullName: "",
      email: "",
      role: "",
      businessName: "",
      tradingName: "",
      companyType: "",
      industry: "",
      registrationNumber: "",
      incorporationDate: "",
      employees: "",
      website: "",
      businessDescription: "",
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 bg-white rounded-xl px-6 md:px-24">
        {/* Section 1 - Primary Contact */}
        <h2 className="text-xl font-semibold mb-1">
          Primary Contact / Admin Details
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Provide details of the primary contact person
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="labelText">Full Name</label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="Eg John Doe"
              className="border p-2 rounded-md w-full border-gray-200"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="labelText">Email Address</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Eg john@acme.com"
              className="border p-2 rounded-md w-full border-gray-200"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="labelText">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="border border-gray-200 p-2 rounded-md w-full"
            >
              <option value="">Select Role</option>
              <option>Limited Liability Company</option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
            </select>
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="mobileNumber"
              control={control}
              rules={{ required: "Mobile number is required" }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"us"} // default country
                  enableSearch={true} // search for countries
                  enableAreaCodes={true} // show area codes
                  disableDropdown={false} // enable dropdown
                  countryCodeEditable={true} // allow editing country code manually
                  containerClass="w-full"
                  inputClass="w-full text-sm outline-none px-3 py-2"
                  buttonClass="h-full border-r"
                  inputStyle={{ width: "100%" }}
                  buttonStyle={{ flexShrink: 0 }}
                />
              )}
            />
            {errors.mobileNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Business Profile */}
        <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
        <p className="text-sm text-gray-500 mb-2">
          Complete your business information for verification
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="labelText">Business Name</label>
            <input
              {...register("businessName", {
                required: "Business name is required",
              })}
              type="text"
              placeholder="Eg Acme Corporation"
              className="border p-2 rounded-md w-full border-gray-200"
            />
            {errors.businessName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div>
            <label className="labelText">Trading Name</label>
            <input
              {...register("tradingName")}
              type="text"
              placeholder="Eg Acme Corp Ltd."
              className="border p-2 rounded-md w-full border-gray-200"
            />
          </div>

          <div>
            <label className="labelText">Company Type</label>
            <select
              {...register("companyType", {
                required: "Company type is required",
              })}
              className="border p-2 rounded-md w-full border-gray-200"
            >
              <option value="">Select Type</option>
              <option>Limited Liability Company</option>
              <option>Private Company</option>
              <option>Public Company</option>
            </select>
            {errors.companyType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.companyType.message}
              </p>
            )}
          </div>

          <div>
            <label className="labelText">Industry</label>
            <input
              {...register("industry")}
              type="text"
              placeholder="Eg Technology"
              className="border p-2 rounded-md w-full border-gray-200"
            />
          </div>

          <div>
            <label className="labelText">Registration Number</label>
            <input
              {...register("registrationNumber")}
              type="text"
              placeholder="Eg RC123456"
              className="border p-2 rounded-md w-full border-gray-200"
            />
          </div>

          <div>
            <label className="labelText">Date of Incorporation</label>
            <input
              {...register("incorporationDate")}
              type="date"
              className="border p-2 rounded-md w-full border-gray-200"
            />
          </div>

          <div>
            <label className="labelText">Number of Employees</label>
            <select
              {...register("employees")}
              className="border p-2 rounded-md w-full border-gray-200"
            >
              <option value="">Select Employees</option>
              <option>1</option>
              <option>2-10</option>
              <option>10-50</option>
              <option>50+</option>
            </select>
          </div>

          <div>
            <label className="labelText">Website</label>
            <input
              {...register("website")}
              type="url"
              placeholder="Eg https://acme.com"
              className="border p-2 rounded-md w-full border-gray-200"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="labelText">Business Description</label>
          <textarea
            {...register("businessDescription")}
            placeholder="Brief description of your business activities"
            className="border p-2 rounded-md w-full border-gray-200"
            rows="3"
          />
        </div>

        <div className="mt-6 flex self-auto">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
