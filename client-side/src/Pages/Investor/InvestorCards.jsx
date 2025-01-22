import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const InvestorCards = () => {
  const { userdata } = useAuth();
  const [activeCards, setActiveCards] = useState([true, true]); // State to track active/inactive status of cards

  const handleToggle = (index) => {
    setActiveCards((prev) => {
      const newActiveCards = [...prev];
      newActiveCards[index] = !newActiveCards[index]; // Toggle the active state
      return newActiveCards;
    });
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-10">
          <div className="fixed top-[100px] left-[5px] z-40">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-salmon text-white sticky drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
            >
              <i className="fas fa-bars text-lg"></i>
            </label>
          </div>

          <div className="min-h-screen rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-white">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Cards (2)</h1>
                <button className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full hover:bg-gray-600">
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>

              {/* Card 1 */}
              <div
                className={`p-6 rounded-xl shadow-md bg-gradient-to-b from-gray-800 to-gray-600 mb-4 transition-opacity duration-300 ${
                  activeCards[0] ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="mb-3">
                  <p className="text-sm text-gray-400">NAME</p>
                  <p className="font-semibold">Sandro Tavartkiladze</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-400">CARD NUMBER</p>
                  <p className="font-semibold">**** 7412</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">BALANCE</p>
                    <p className="text-2xl font-bold">$6,200.00</p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="toggle"
                        defaultChecked
                        onChange={() => handleToggle(0)} // Toggle for Card 1
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className={`p-6 rounded-xl shadow-md bg-gradient-to-b from-gray-800 to-gray-600 transition-opacity duration-300 ${
                  activeCards[1] ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="mb-3">
                  <p className="text-sm text-gray-400">NAME</p>
                  <p className="font-semibold">Sandro Tavartkiladze</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-400">CARD NUMBER</p>
                  <p className="font-semibold">**** 2444</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">BALANCE</p>
                    <p className="text-2xl font-bold">$1,500.00</p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="toggle"
                        defaultChecked
                        onChange={() => handleToggle(1)} // Toggle for Card 2
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
            </div>
          </div>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg ">
              Investor
            </li>
            {userdata && (
              <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
                {userdata.name || "Investor"}!
              </li>
            )}
            <Link to="/investordashboard">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>Dashboard</a>
              </li>
            </Link>
            <Link to="/investorpayment">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>Payments</a>
              </li>
            </Link>
            <Link to="/investorcard">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>Cards</a>
              </li>
            </Link>
            <Link to="/investorwatchlist">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>WatchList</a>
              </li>
            </Link>
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a>Rewards</a>
            </li>
            <Link to="/investorterms">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>Terms and Conditions</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestorCards;
