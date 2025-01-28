import React, { useState } from "react";

const Bkash = () => {
  const [bkashNumber, setBkashNumber] = useState("");
  const [accountType, setAccountType] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bkash Number:", bkashNumber);
    console.log("Account Type:", accountType);
    // You can add your logic here to handle the form submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mx-auto text-center mb-4">
            Bkash Payment
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Horizontal layout for Bkash Number */}
            <div className="flex flex-col items-center gap-4 mb-4">
              <label className="label">
                <span className="label-text font-semibold">Bkash Number:</span>
              </label>
              <input
                type="text"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                placeholder="Enter Bkash Number"
                className="input input-bordered "
                required
              />
            </div>

            {/* Horizontal layout for Account Type */}
            <div className="flex  flex-col items-center gap-4 mb-6">
              <label className="label">
                <span className="label-text font-semibold">
                  Type of Bkash Account:
                </span>
              </label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="select select-bordered flex-1"
                required
              >
                <option value="personal">Personal Account</option>
                <option value="merchant">Merchant Account</option>
                <option value="pr">PR Account</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-error text-white w-full">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bkash;
