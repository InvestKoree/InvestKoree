import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const InvestorWatchlist = () => {
  const { userdata } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWatchlist(response.data.watchlist.posts); // Assuming posts is an array of post IDs
        console.log("Watchlist Posts:", response.data.watchlist.posts);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  if (!userdata && !watchlist) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

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

          <p className="lg:text-3xl font-bold mb-12 mt-16 sm:mx-auto xs:mx-auto xxs:mx-auto sm:text-xl xs:text-xl xxs:text-xl">
            Watchlist
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y sm:w-[40%] xs:w-[40%] xxs:w-[30%] divide-gray-200">
              <thead>
                <tr className="bg-salmon rounded-xl">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Serial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Project Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Investment Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Projected ROI
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {watchlist.map((row, index) => {
                  const investedAmount = 70000;

                  return (
                    <tr key={row._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(row.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.returndate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {investedAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a>Dashboard</a>
            </li>
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a>Payments</a>
            </li>
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a>Cards</a>
            </li>
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
export default InvestorWatchlist;
