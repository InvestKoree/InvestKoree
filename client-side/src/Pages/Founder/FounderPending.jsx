import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const FounderPending = () => {
  const [posts, setPosts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
  const { userdata } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/adminpost/founderpending`);
        setPosts(response.data);
      } catch (error) {
        toast.error("Error fetching pending posts: " + error.message);
      }
    };

    fetchPendingPosts();
  }, [API_URL]);
  const handleViewPost = (post) => {
    // setSelectedPost(post); // Set the selected post (if needed)
    navigate(`/founderpostreview/${post._id}`, { state: { post } }); // Navigate with ID and post data
  };
  const handleRemovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/adminpost/pending/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
      toast.success("Post removed successfully");
    } catch (error) {
      toast.error("Error removing post: " + error.message);
    }
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-10">
        <div className="fixed top-[100px] left-[5px]">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-salmon text-white sticky lg:hidden drawer-button transform transition-transform duration-300 ease-in-out delay-150 hover:scale-105"
          >
            <i className="fas fa-bars text-lg"></i>
          </label>
        </div>
        <h2 className="font-bold lg:text-3xl mb-12">Pending Posts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-salmon rounded-xl">
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Serial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Review
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
                      <span className="text-red-500 font-bold">Denied</span>
                    ) : (
                      <span className="text-yellow-500 font-bold">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {post.status === "denied" && post.reason ? (
                      <div className="mt-2 bg-gray-100 p-4  rounded-lg shadow-md">
                        <p className="text-sm text-gray-700">{post.reason}</p>
                      </div>
                    ) : (
                      <span className="text-gray-500">No reason provided</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2 mt-2 ">
                    <button
                      onClick={() => handleViewPost(post)}
                      className="btn btn-success text-white"
                    >
                      View Post
                    </button>
                    <button
                      onClick={() => handleRemovePost(post._id)}
                      className="btn btn-error text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
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
          <li className="font-extrabold text-salmon ml-4 text-lg mb-4 rounded-lg">
            Founder
          </li>
          {userdata && (
            <li className="font-extrabold text-salmon ml-4 text-lg mb-2 rounded-lg">
              {userdata.name || "founder"}!
            </li>
          )}
          <Link to="/founderdashboard">
            <li className="font-bold hover:bg-salmon hover:text-white text-lg mb-2 rounded-lg">
              <a>Dashboard</a>
            </li>
          </Link>
          <Link to="/founderpending">
            <li className="font-bold hover:bg-salmon hover:text-white text-lg rounded-lg">
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
  );
};

export default FounderPending;
