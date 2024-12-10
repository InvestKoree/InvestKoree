import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import OTPModal from "../../shared/OTPModal";
import { useState, useEffect } from "react";

const FounderDashboard = () => {
  const { userdata } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false); // State to hold any error messages
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

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
          setError("Failed to load posts. Please try again later.");
        }
      }
    };

    fetchUserPosts();
  }, [userdata]);
  const handleOTPSuccess = () => {
    toast.success("Phone number verified successfully!");
    // Additional logic after successful OTP verification can be added here
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-10">
          <div className="fixed top-[100px] left-[5px] ">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-salmon text-white sticky lg:hidden drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
            >
              <i className="fas fa-bars text-lg"></i>
            </label>
          </div>
          <div className="flex lg:flex-row lg:justify-between sm:flex-col xs:flex-col xxs:flex-col">
            <div className="flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col gap-16 my-10">
              <div className="flex lg:flex-col lg:justify-center lg:items-center sm:flex-col xs:flex-col xxs:flex-col">
                <p className="lg:text-3xl font-bold sm:mx-auto sm:text-lg xs:text-lg xxs:text-lg ">
                  Total Invested Amount
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
                  Left for Investment
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
                  Asking Investment Amount
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
            <div>
              <Link to="/founderpost">
                <input
                  type="submit"
                  className="post-btn lg:h-[25%] lg:w-[100px] sm:h-[60%] xs:h-[60%] xxs:h-[60%] sm:w-[30%] xs:w-[30%] xxs:w-[30%]"
                  name="founder-post"
                  value="Post"
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setShowOTPModal(true)}
              className="post-btn lg:h-[25%] lg:w-[100px] mt-4 sm:h-[60%] xs:h-[60%] xxs:h-[60%] sm:w-[30%] xs:w-[30%] xxs:w-[30%]"
            >
              Verify
            </button>
          </div>
          <p className="lg:text-3xl font-bold sm:mx-auto xs:mx-auto xxs:mx-auto sm:text-lg xs:text-lg xxs:text-lg mb-12 mt-16">
            Invested Project List
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-salmon rounded-xl">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Serial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Project Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Investment Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Investment Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Invested Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Asking Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Left For Investment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Investment Status
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
                        {investedAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {fundingAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {leftForInvestment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        Pending
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold text-salmon ml-4 xs:mt-6 xxs:mt-6 sm:mt-6 text-lg mb-4 rounded-lg">
              Founder
            </li>
            {userdata && (
              <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
                {userdata.name || "Founder"}!
              </li>
            )}
            <Link to="#">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>Dashboard</a>
              </li>
            </Link>
            <Link to="/founderpending">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>Pending Posts</a>
              </li>
            </Link>
            <Link to="/terms">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>Terms and Conditions</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSuccess={handleOTPSuccess}
        phone={userdata?.phone || ""}
      />
    </div>
  );
};

export default FounderDashboard;
