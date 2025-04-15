import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const FounderPending = () => {
  const { t } = useTranslation(); // Initialize translation
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const { userdata } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/adminpost/founderpending`);
        setPosts(response.data);
      } catch (error) {
        toast.error(t("errorFetchingPosts") + error.message);
      }
    };

    fetchPendingPosts();
  }, [API_URL, t]);

  const handleViewPost = (post) => {
    navigate(`/founderpostreview/${post._id}`, { state: { post } });
  };

  const handleRemovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/adminpost/pending/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
      toast.success(t("postRemovedSuccessfully"));
    } catch (error) {
      toast.error(t("errorFetchingPosts") + error.message);
    }
  };
  const dp = userdata?.profilePic;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-10">
        <div className="fixed top-[100px] left-[5px]">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-salmon  lg:mt-0 sm:mt-96 xs:mt-96 xxs:mt-96 text-white sticky lg:hidden drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
          >
            <i className="fas fa-bars text-lg"></i>
          </label>
        </div>
        <h2 className="font-bold lg:text-3xl mb-12">{t("pendingPosts")}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-salmon rounded-xl">
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {t("serial")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {t("businessName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {t("reason")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {t("review")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.businessName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {post.status === "denied" ? (
                      <span className="text-red-500 font-bold">
                        {t("denied")}
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-bold">
                        {t("pending")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {post.status === "denied" && post.reason ? (
                      <div className="mt-2 bg-gray-100 p-4 rounded-lg shadow-md">
                        <p className="text-sm text-gray-700">{post.reason}</p>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {t("noReasonProvided")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2 mt-2 ">
                    <button
                      onClick={() => handleViewPost(post)}
                      className="btn btn-success text-white"
                    >
                      {t("viewPost")}
                    </button>
                    <button
                      onClick={() => handleRemovePost(post._id)}
                      className="btn btn-error text-white"
                    >
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="drawer-side lg:mt-0  z-40 sm:mt-32 xs:mt-32 xxs:mt-32 ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
          <li className="font-extrabold text-salmon ml-4 text-lg mb-4 rounded-lg">
            {t("founder")}
          </li>
          {userdata && (
            <img
              src={dp}
              alt="Profile"
              className="w-16 h-16 rounded-full lg:ml-4 xxs:ml-4 sm:ml-4 xs:ml-4 flex justify-center  object-cover"
            />
          )}
          {userdata && (
            <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
              {t("founderwelcome")}
              {userdata.name || "founder"}!
            </li>
          )}
          <Link to="/founderdashboard">
            <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
              <a>{t("dashboard")}</a>
            </li>
          </Link>
          <Link to="/founderpending">
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
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
  );
};

export default FounderPending;
