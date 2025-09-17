export default function BusinessVerification() {
  return (
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
            type="text"
            placeholder="Eg John Doe"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Email Address</label>
          <input
            type="email"
            placeholder="Eg john@acme.com"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Role</label>
          <select className="border border-gray-200 p-2 rounded-md w-full">
            <option>Limited Liability Company</option>
            <option>Sole Proprietorship</option>
            <option>Partnership</option>
          </select>
        </div>

        <div>
          <label className="labelText">Phone Number</label>
          <div className="flex gap-2">
            <span className="border p-2 rounded-md">+31</span>
            <input
              type="text"
              placeholder="000 000 000"
              className="border p-2 rounded-md flex-1 border-gray-200"
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
      <p className="text-sm text-gray-500 mb-2">
        Complete your business information for verification
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="labelText">Business Name</label>
          <input
            type="text"
            placeholder="Eg Acme Corporation"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Trading Name</label>
          <input
            type="text"
            placeholder="Eg Acme Corp Ltd."
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Company Type</label>
          <select className="border p-2 rounded-md w-full border-gray-200">
            <option>Limited Liability Company</option>
            <option>Private Company</option>
            <option>Public Company</option>
          </select>
        </div>

        <div>
          <label className="labelText">Industry</label>
          <input
            type="text"
            placeholder="Eg Technology"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Registration Number</label>
          <input
            type="text"
            placeholder="Eg RC123456"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Date of Incorporation</label>
          <input
            type="date"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>

        <div>
          <label className="labelText">Number of Employees</label>
          <select className="border p-2 rounded-md w-full border-gray-200">
            <option>1</option>
            <option>2-10</option>
            <option>10-50</option>
            <option>50+</option>
          </select>
        </div>

        <div>
          <label className="labelText">Website</label>
          <input
            type="url"
            placeholder="Eg https://acme.com"
            className="border p-2 rounded-md w-full border-gray-200"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="labelText">Business Description</label>
        <textarea
          placeholder="Brief description of your business activities"
          className="border p-2 rounded-md w-full border-gray-200"
          rows="3"
        />
      </div>

      <div className="mt-6 flex self-auto">
        <button className="bg-black text-white px-6 py-2 rounded-md shadow hover:bg-gray-800">
          Save Changes
        </button>
      </div>
    </div>
  );
}
