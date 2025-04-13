import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const InvestorCards = () => {
  const { t } = useTranslation(); // Initialize translation
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
              className="btn bg-salmon  lg:mt-0 sm:mt-96 xs:mt-96 xxs:mt-96 text-white sticky drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
            >
              <i className="fas fa-bars text-lg"></i>
            </label>
          </div>

          <div className="min-h-screen rounded-xl p-6">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {t("myCards")} {t("cardCount")}
                </h1>
                <button className="w-8 h-8 bg-gray-700 flex items-center justify-center rounded-full hover:bg-gray-600">
                  <span className="text-xl font-bold text-white">+</span>
                </button>
              </div>

              {/* Card 1 */}
              <div
                className={`p-6 rounded-xl shadow-md bg-gradient-to-b from-gray-800 to-gray-600 mb-4 transition-opacity duration-300 ${
                  activeCards[0] ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="mb-3 text-white">
                  <p className="text-sm text-gray-400">{t("name")}</p>
                  <p className="font-semibold">Sandro Tavartkiladze</p>
                </div>
                <div className="mb-3 text-white">
                  <p className="text-sm text-gray-400">{t("cardNumber")}</p>
                  <p className="font-semibold">**** 7412</p>
                </div>
                <div className="flex justify-between items-center text-white">
                  <div>
                    <p className="text-sm text-gray-400">{t("balance")}</p>
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
                <div className="mb-3 text-white">
                  <p className="text-sm text-gray-400">{t("name")}</p>
                  <p className="font-semibold">Sandro Tavartkiladze</p>
                </div>
                <div className="mb-3 text-white">
                  <p className="text-sm text-gray-400">{t("cardNumber")}</p>
                  <p className="font-semibold">**** 2444</p>
                </div>
                <div className="flex justify-between items-center text-white">
                  <div>
                    <p className="text-sm text-gray-400">{t("balance")}</p>
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

        <div className="drawer-side lg:mt-0  sm:mt-32 xs:mt-32 xxs:mt-32 z-40">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg ">
              {t("investor")}
            </li>
            {userdata && (
              <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
                {t("investorwelcome")}
                {userdata.name || t("investor")}!
              </li>
            )}
            <Link to="/investordashboard">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>{t("dashboard")}</a>
              </li>
            </Link>
            <Link to="/investorpayment">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>{t("payments")}</a>
              </li>
            </Link>
            <Link to="/investorcard">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>{t("cards")}</a>
              </li>
            </Link>
            <Link to="/investorwatchlist">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>{t("watchlist")}</a>
              </li>
            </Link>
            <Link to="/investorrewards">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>{t("rewards")}</a>
              </li>
            </Link>
            <Link to="/investorterms">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>{t("termsAndConditions")}</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestorCards;
