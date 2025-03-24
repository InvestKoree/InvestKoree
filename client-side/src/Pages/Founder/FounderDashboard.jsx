import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TermsModal from "./TermsModal"; // Import useTranslation

const FounderDashboard = () => {
  const { t } = useTranslation(); // Initialize translation
  const { userdata } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (userdata && userdata._id) {
        try {
          const response = await fetch(`${API_URL}/api/${userdata._id}/posts`);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          const data = await response.json();
          setPosts(data);
          setError(null); // Reset error state on successful fetch
        } catch (error) {
          console.error("Error fetching user posts:", error);
          setError(t("errorFetchingPosts"));
        }
      }
    };

    fetchUserPosts();
  }, [userdata, t]);
  const handlePostClick = () => {
    setIsModalOpen(true);
  };

  const handleOpenTerms = () => {
    window.open("/founderterms", "_blank"); // Open the FounderTerms page in a new window
    setCanPost(true); // Enable the post button
  };

  const handleContinueToPost = () => {
    if (canPost) {
      // Redirect to the FounderPost page
      window.location.href = "/founderpost";
    }
  };

  return (
    <div>
      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenTerms={handleOpenTerms}
      />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2 " type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-10">
          <div className="fixed top-[100px] left-[5px] ">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-salmon sm:mt-96 xs:mt-96 xxs:mt-96 text-white sticky lg:hidden drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
            >
              <i className="fas fa-bars text-lg"></i>
            </label>
          </div>
          <div className="flex lg:flex-row lg:justify-between sm:flex-col xs:flex-col xxs:flex-col">
            <div className="flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col gap-16 my-10">
              <div className="flex lg:flex-col lg:justify-center lg:items-center sm:flex-col xs:flex-col xxs:flex-col">
                <p className="lg:text-3xl font-bold sm:mx-auto sm:text-lg xs:text-lg xxs:text-lg ">
                  {t("totalInvestedAmount")}
                </p>
                <div
                  className="radial-progress text-primary mt-4"
                  style={{ "--value": 70 }}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
              <div className="flex lg:flex-col lg:justify-center lg:items-center sm:flex-col xs:flex-col xxs:flex-col">
                <p className="lg:text-3xl font-bold sm:mx-auto sm:text-lg xs:text-lg xxs:text-lg ">
                  {t("leftForInvestment")}
                </p>
                <div
                  className="radial-progress text-secondary mt-4"
                  style={{ "--value": 30 }}
                  role="progressbar"
                >
                  30
                </div>
              </div>
              <div className="flex lg:flex-col lg:justify-center lg:items-center sm:flex-col xs:flex-col xxs:flex-col">
                <p className="lg:text-3xl font-bold sm:mx-auto sm:text-lg xs:text-lg xxs:text-lg ">
                  {t("askingInvestmentAmount")}
                </p>
                <div
                  className="radial-progress text-accent mt-4"
                  style={{ "--value": 70 }}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              onClick={handlePostClick}
              type="submit"
              className="post-btn lg:h-[50%] lg:w-[100px] sm:h-[60%] xs:h-[60%] xxs:h-[60%] sm:w-[30%] xs:w-[30%] xxs:w-[30%]"
              name="founder-post"
              value={t("post")}
            />
          </div>
          <p className="lg:text-3xl font-bold sm:mx-auto xs:mx-auto xxs:mx-auto sm:text-lg xs:text-lg xxs:text-lg mb-12 mt-16">
            {t("investedProjectList")}
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-salmon rounded-xl">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("serial")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("projectTitle")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investmentStartDate")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investmentDeadline")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investedAmount")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("askingAmount")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("leftForInvestment")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("investmentStatus")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((row, index) => {
                  const investedAmount = 70000;
                  const fundingAmount = parseFloat(row.fundingAmount) || 0; // Convert fundingAmount to a number
                  const leftForInvestment = fundingAmount - investedAmount; // Calculate Left For Investment

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
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {fundingAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {leftForInvestment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {t("pending")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="drawer-side mt-4 sm:mt-32 xs:mt-32 xxs:mt-32 z-40">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg">
              {t("founder")}
            </li>
            {userdata && (
              <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
                {t("founderwelcome")}
                {userdata.name || t("founder")}!
              </li>
            )}
            <Link to="#">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>{t("dashboard")}</a>
              </li>
            </Link>
            <Link to="/founderpending">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>{t("pendingPosts")}</a>
              </li>
            </Link>
            <Link to="/founderterms">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>{t("termsAndConditions")}</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Uncomment if OTPModal is needed */}
      {/* <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSuccess={handleOTPSuccess}
        phone={userdata?.phone || ""}
      /> */}
    </div>
  );
};

export default FounderDashboard;
