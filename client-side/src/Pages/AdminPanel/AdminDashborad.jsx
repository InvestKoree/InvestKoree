import { FcLowBattery } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";
import { FcDonate } from "react-icons/fc";
import { useAuth } from "../../providers/AuthProvider";
import { AiFillDollarCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { userdata } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/allposts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [API_URL]);

  if (loading) {
    return <span className="loading-spinner loading-lg"></span>;
  }
  if (!userdata) {
    return <span className=" loading-spinner loading-lg"></span>;
  }
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
          <p className=" font-bold  lg:text-3xl mb-4">Projects</p>
          <p className="text-slate-400 xs:text-sm xxs:text-sm sm:text-sm mb-6">
            Detailed Project Information
          </p>
          <div className="shadow-md rounded-xl flex lg:flex-row xs:flex-col xxs:flex-col sm:flex-col mb-28 gap-16 min-h-32 p-8">
            <div>
              <AiFillDollarCircle className="h-10 w-10"></AiFillDollarCircle>
              <p className="lg:text-3xl font-bold">335$</p>
              <p className="text-slate-400 xs:text-sm xxs:text-sm sm:text-sm">
                Total Esitmated Invesment
              </p>
            </div>
            <div>
              <FcDonate className="h-10 w-10"></FcDonate>
              <p className="lg:text-3xl font-bold">335$</p>
              <p className="text-slate-400 xs:text-sm xxs:text-sm sm:text-sm">
                Total Invested Amount
              </p>
            </div>
            <div>
              <FcLowBattery className="h-10 w-10"></FcLowBattery>
              <p className="lg:text-3xl font-bold">335$</p>
              <p className="text-slate-400 xs:text-sm xxs:text-sm sm:text-sm">
                Total Left for Invesment
              </p>
            </div>
            <div>
              <FcIdea className="h-10 w-10"></FcIdea>
              <p className="lg:text-3xl font-bold">33</p>
              <p className="text-slate-400 xs:text-sm xxs:text-sm sm:text-sm">
                Total Projects
              </p>
            </div>
          </div>
          <p className=" font-bold lg:text-3xl mb-12">Project List</p>
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y  divide-gray-200">
              <thead>
                <tr className="bg-salmon rounded-xl">
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Serial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Project Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Number of Investors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Remaining Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((row, index) => {
                  const investedAmount = 70000;
                  const fundingAmount = parseFloat(row.fundingAmount) || 0;
                  const leftForInvestment = fundingAmount - investedAmount;

                  return (
                    <tr
                      key={row._id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/post/${row._id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        HP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        15
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {fundingAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {leftForInvestment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(row.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.returndate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        Ongoing
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
            {/* Sidebar content here */}
            <li className="font-extrabold text-salmon ml-4   xs:mt-6 xxs:mt-6 sm:mt-6   text-lg mb-4 rounded-lg ">
              Admin
            </li>
            {userdata && (
              <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
                {userdata.name || "Admin"}!
              </li>
            )}
            <Link to="#">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
                <a>Dashboard</a>
              </li>
            </Link>
            <Link to="/adminpending">
              <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
                <a>Pending Posts</a>
              </li>
            </Link>
            {/*
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a></a>
            </li>
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a></a>
            </li>
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
              <a></a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
