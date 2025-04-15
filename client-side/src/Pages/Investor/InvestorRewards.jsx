import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { toast } from "react-toastify"; // Import toast for notifications

const InvestorRewards = () => {
  const { t } = useTranslation(); // Initialize translation
  const { userdata, logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/allposts`);
        if (!response.ok) {
          throw new Error(t("errorFetchingPosts"));
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(t("errorFetchingPosts"), error);
        toast.error(t("errorFetchingPosts")); // Notify user of the error
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [API_URL, t]);

  if (loading) {
    return <span className="loading-spinner loading-lg"></span>;
  }

  // if (!userdata) {
  //   return (
  //     <div className="text-center">
  //       <p>{t("pleaseLogin")}</p>
  //       <Link to="/investorlogin" className="btn btn-primary">
  //         {t("login")}
  //       </Link>
  //     </div>
  //   );
  // }
  const dp = userdata?.profilePic;
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-10">
          <div className="fixed top-[100px] left-[5px] z-40">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-salmon lg:mt-0 sm:mt-96 xs:mt-96 xxs:mt-96 text-white sticky drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
            >
              <i className="fas fa-bars text-lg"></i>
            </label>
          </div>
          <p className="lg:text-3xl font-bold mb-12 mt-16 sm:mx-auto xs:mx-auto xxs:mx-auto sm:text-xl xs:text-xl xxs:text-xl">
            {t("rewards")}
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y sm:w-[40%] xs:w-[40%] xxs:w-[30%] divide-gray-200">
              <thead>
                <tr className="bg-salmon rounded-xl">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("serial")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("projectTitle")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investmentDuration")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("projectedROI")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("rewardsText")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("action")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((row, index) => (
                  <tr key={row._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.businessName || t("noData")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(row.startDate).toLocaleDateString()} to{" "}
                      {new Date(row.returndate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      50tk CashBack on every 1000tk investment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      <Link
                        to={`/projectdetail/${row._id}`}
                        className="btn btn-success text-white mr-2"
                      >
                        {t("invest")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="drawer-side lg:mt-0 sm:mt-32 xs:mt-32 xxs:mt-32 z-40">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg ">
              {t("investor")}
            </li>
            {userdata && (
              <img
                src={dp}
                alt="Profile"
                className="w-16 h-16 rounded-full ml-4 flex justify-center  object-cover"
              />
            )}
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

export default InvestorRewards;
