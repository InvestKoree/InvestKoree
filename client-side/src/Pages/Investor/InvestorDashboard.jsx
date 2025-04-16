import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../../providers/AuthProvider";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const randomData = () => Math.floor(Math.random() * 100);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartData1 = {
  labels: months,
  datasets: [
    {
      label: "Total Income",
      data: months.map(randomData),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      barThickness: 15,
      maxBarThickness: 20,
    },
  ],
};

const chartData2 = {
  labels: months,
  datasets: [
    {
      label: "Total Investment",
      data: months.map(randomData),
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      barThickness: 15,
      maxBarThickness: 20,
    },
  ],
};

const InvestorDashboard = () => {
  const { t } = useTranslation(); // Initialize translation
  const [data1] = useState(chartData1);
  const [data2] = useState(chartData2);
  const { userdata } = useAuth();
  const [investments, setInvestments] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(`${API_URL}/investments/get`);
        const data = await response.json();
        setInvestments(data);
        console.log(data);
      } catch (error) {
        console.error(t("errorFetchingInvestments"), error);
      }
    };

    fetchInvestments();
  }, [API_URL, t]);

  if (!userdata && !investments) {
    return (
      <span className="loading loading-spinner loading-lg">{t("loading")}</span>
    );
  }
  const dp = userdata?.profilePic;

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
          <div className="flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col">
            <div className="lg:w-[50%] sm:w-full xs:w-full xxs:w-full">
              <Bar
                data={data1}
                options={{
                  scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
            <div className="lg:w-[50%] sm:w-full xs:w-full xxs:w-full">
              <Bar
                data={data2}
                options={{
                  scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true },
                  },
                }}
              />
            </div>
          </div>
          <p className="lg:text-3xl font-bold mb-12 mt-16 sm:mx-auto xs:mx-auto xxs:mx-auto sm:text-xl xs:text-xl xxs:text-xl">
            {t("investedProjectList")}
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
                    {t("investmentDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("returnDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investedAmount")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((row, index) => {
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
        <div className="drawer-side lg:mt-0 z-40 sm:mt-32 xs:mt-32 xxs:mt-32 ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg">
              {t("investor")}
            </li>
            {userdata && (
              <img
                src={dp}
                alt="Profile"
                className="w-24 h-24 rounded-full lg:ml-4 xxs:ml-4 sm:ml-4 xs:ml-4  flex justify-center  object-cover"
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

export default InvestorDashboard;
