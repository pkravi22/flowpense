export default function ReviewStep({ nextStep, prevStep, data }) {
  return (
    <div className="p-6 space-y-6 border-b border-background">
      {/* Second Div */}
      <div className="space-y-6 ">
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Spend Limit(NGN)
            </label>
            <input
              type="text"
              value={data.cardType || ""}
              readOnly
              placeholder="10000"
              className="w-full border border-gray-300  outline-0 rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Spend Limit(NGN)
            </label>
            <input
              type="text"
              value={data.name || ""}
              readOnly
              placeholder="30000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Spend Limit(NGN)
            </label>
            <input
              type="text"
              value={data.currency || ""}
              readOnly
              placeholder="50000"
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Per Transaction Limit(NGN)
            </label>
            <input
              type="text"
              value={data.limit || ""}
              readOnly
              className="w-full border border-gray-300 outline-0 rounded-lg px-3 py-2 bg-gray-50"
            />
          </div>
        </div>

        {/* Second Sub Div → Expense Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expense Categories
          </label>
          <div className="grid  grid-cols-2 md:grid-cols-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Travel</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Food</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Office Supplies</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Medical</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Get Station</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Office Supplies</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Software tools</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Transport</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Medical</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
