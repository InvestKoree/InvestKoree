import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAuth } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProjectDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const { userdata } = useAuth(); // Get the project ID from the URL
  const [project, setProject] = useState(null); // State to hold project data
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("images");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState({});
  const [newReply, setNewReply] = useState("");
  const [showRepliesToggle, setShowRepliesToggle] = useState({}); // State to track show/hide for replies

  // Fetch comments for the specific project
  const fetchComments = async (projectId) => {
    try {
      const response = await axios.get(`${API_URL}/comments/${projectId}`);
      console.log("Fetched comments:", response.data); // Log the comments to see if it's updated
      setComments(response.data); // Set comments for this project
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchReplies = async (commentId) => {
    try {
      const response = await axios.get(
        `${API_URL}/comments/${commentId}/replies`
      );
      return response.data; // Returns the array of replies
    } catch (error) {
      console.error("Error fetching replies:", error);
      return [];
    }
  };

  // Handle adding a new comment
  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("comment_error"));
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/comments/add`,
        { postId: project._id, text: newComment }, // Include project ID in the request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setNewComment(""); // Clear the input field
        fetchComments(project._id); // Refresh comments for this project
        toast.success(t("comment_success")); // Log the response to check if it's successful
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(t("comment_failure"));
    }
  };

  const handleAddToWatchlist = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    try {
      const response = await axios.post(
        `${API_URL}/watchlist/add`,
        { postId: project._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsAddedToWatchlist(true);
        toast.success(t("watchlist_add_success"));
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error(t("watchlist_add_failure"));
    }
  };

  const checkIfAddedToWatchlist = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const watchlist = response.data.watchlist || { posts: [] };
      setIsAddedToWatchlist(
        watchlist.posts.some((post) => post._id === postId)
      );
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/founderpost/projectdetail/${id}`
        );
        const data = await response.json();
        setProject(data);
        checkIfAddedToWatchlist(data._id);
        fetchComments(data._id); // Fetch comments when project details are loaded
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id, API_URL]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleInvestClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("invest_error"));
      return;
    }
    const post = {
      _id: id,
      businessName: project.businessName,
      returndate: project.returndate,
      startDate: project.startDate,
    };

    try {
      const response = await fetch(`${API_URL}/investments/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error(t("investment_failure"));
      }

      const result = await response.json();
      console.log("Investment data sent successfully:", result);
      navigate("/payment");
    } catch (error) {
      console.error("Error sending investment data:", error);
    }
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  console.log("Project Data:", project);
  const handleReplySubmit = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("reply_error"));
      return;
    }

    try {
      await axios.post(
        `${API_URL}/comments/${commentId}/reply`, // Corrected path
        { text: newReply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewReply("");
      setReplyingTo(null);
      fetchComments(project._id);
      toast.success(t("reply_success"));
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error(t("reply_failure"));
    }
  };

  const loadReplies = async (commentId) => {
    if (replies[commentId]) return; // Prevent refetching if already loaded
    const fetchedReplies = await fetchReplies(commentId);
    setReplies((prev) => ({ ...prev, [commentId]: fetchedReplies }));
  };

  const toggleRepliesVisibility = (commentId) => {
    setShowRepliesToggle((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_URL}/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success(t("comment_delete_success"));
    } catch (error) {
      console.error("Error deleting comment", error);
      toast.error(t("comment_delete_failure"));
    }
  };
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await axios.delete(
        `${API_URL}/comments/${commentId}/reply/${replyId}`,
        {}
      );
      // Update the replies state to remove the deleted reply
      setReplies((prev) => ({
        ...prev,
        [commentId]: prev[commentId].filter((reply) => reply._id !== replyId),
      }));
      toast.success(t("reply_delete_success"));
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error(t("reply_delete_failure"));
    }
  };
  return (
    <div>
      <div className="h-50">
        {/* Image and Video Section */}
        <div className="hero flex justify-center">
          <div className="hero-content flex-col lg:flex-row items-center">
            <div>
              <div className="relative w-[full] max-w-md mx-auto">
                {viewMode === "images" ? (
                  <div className="carousel carousel-vertical rounded-box transform transition-transform duration-300 ease-in-out delay-150 hover:scale-125 h-96">
                    {project.businessPicture?.length > 0 ? (
                      project.businessPicture.map((src, index) => (
                        <div
                          key={index}
                          className={`carousel-item h-full lg:mb-10 ${
                            currentSlide === index ? "block" : "hidden"
                          }`} // Add conditional class
                        >
                          <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full mb-10"
                          />
                        </div>
                      ))
                    ) : (
                      <p>{t("no_images")}</p>
                    )}
                  </div>
                ) : (
                  <div className="video-container rounded-md h-96">
                    {project.video ? (
                      <video
                        src={project.video}
                        controls
                        className=" w-full h-full rounded-md"
                      />
                    ) : (
                      <div>{t("no_video")}</div>
                    )}
                  </div>
                )}

                {/* Dot Navigation for Images */}
                {viewMode === "images" && (
                  <div className="flex justify-center mt-12">
                    {project.businessPicture.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${
                          currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                        } w-3 h-3 mx-1 rounded-full`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Button Section for Switching View Mode */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleViewModeChange("images")}
                  className={`btn ${
                    viewMode === "images" ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {t("view_images")}
                </button>
                <button
                  onClick={() => handleViewModeChange("video")}
                  className={`btn ${
                    viewMode === "video" ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {t("view_video")}
                </button>
              </div>
            </div>

            <div className="lg:ml-12 lg:mt-0 mt-8 text-center lg:text-left">
              <h1 className="lg:text-4xl xs:text-lg xxs:text-lg sm:text-lg font-bold">
                {project.businessName}
              </h1>
              <div className="my-6">
                <div className="flex lg:gap-8 xs:gap-4 xxs:gap-4 sm:gap-4">
                  <div className="bg-base-200 lg:p-4 xs:p-2 xxs:p-2 sm:p-2 xs:w-[25%] xxs:w-[25%] sm:w-[25%] flex flex-col lg:w-44 lg:h-20 rounded-lg xs:mx-auto xxs:mx-auto sm:mx-auto">
                    <span className="text-salmon lg:text-2xl">0 Taka</span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      {t("raised")}
                    </div>
                  </div>
                  <div className="bg-base-200 lg:p-4 xs:p-2 xxs:p-2 sm:p-2 xs:w-[25%] xxs:w-[25%] sm:w-[25%] flex flex-col lg:w-44 lg:h-20 rounded-lg xs:mx-auto xxs:mx-auto sm:mx-auto">
                    <span className="text-salmon lg:text-2xl overflow-y-auto">
                      {project.fundingAmount} Taka
                    </span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      {t("goal")}
                    </div>
                  </div>
                  <div className="bg-base-200 lg:p-4 xs:p-2 xxs:p-2 sm:p-2 xs:w-[25%] xxs:w-[25%] sm:w-[25%] flex flex-col lg:w-44 lg:h-20 rounded-lg xs:mx-auto xxs:mx-auto sm:mx-auto">
                    <span className="text-salmon lg:text-2xl">
                      {project.investmentDuration}
                    </span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      {t("duration")}
                    </div>
                  </div>
                </div>
                <div className="lg:w-full xs:w-[95%] xxs:w-[95%] sm:w-[95%] bg-gray-200 rounded-full h-2.5 mt-8 mb-2 xs:mx-auto xxs:mx-auto sm:mx-auto">
                  <div
                    className="bg-salmon h-2.5 rounded-full"
                    style={{
                      width: `${0}%`,
                    }}
                  ></div>
                </div>
                <div className="flex xs:ml-2 xxs:ml-2 sm:ml-2 lg:justify-between xs:justify-between xxs:justify-between sm:justify-between text-sm">
                  <div>{t("raised")}:</div>
                  <div className="xs:mr-2 xxs:mr-2 sm:mr- 2">{0}%</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn xs:w-[60%] xxs:w-[60%] sm:w-[60%] login-btn"
                >
                  {t("invest")}
                </button>
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                      {/* Close Button */}
                      <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={() => setIsModalOpen(false)}
                      >
                        ✖
                      </button>

                      <h2 className="text-xl font-semibold mb-4">
                        Please Read Before Investing
                      </h2>
                      <p className="text-gray-700">
                        Kindly read the
                        <Link
                          to="/investorterms"
                          className="text-blue-500 underline ml-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          terms and policies of investors
                        </Link>
                        <br />
                        before investing.
                      </p>

                      {/* Checkbox */}
                      <div className="mt-4 flex items-center">
                        <input
                          type="checkbox"
                          id="termsCheckbox"
                          className="mr-2"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                        />
                        <label
                          htmlFor="termsCheckbox"
                          className="text-gray-700"
                        >
                          I have read the terms
                        </label>
                      </div>

                      {/* Invest Button */}
                      <button
                        className={`mt-4 px-4 py-2 rounded-md text-white w-full 
                ${
                  isChecked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }
              `}
                        disabled={!isChecked}
                        onClick={handleInvestClick}
                      >
                        Invest
                      </button>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-outline tooltip tooltip-bottom custom-tooltip hover:bg-salmon"
                  data-tip="Add to Watchlist"
                  onClick={handleAddToWatchlist}
                  disabled={isAddedToWatchlist}
                >
                  {isAddedToWatchlist ? (
                    <AiFillStar className="mr-2 text-yellow-500" size={20} />
                  ) : (
                    <AiOutlineStar className="mr-2 text-gray-500" size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row xs:flex-col xxs:flex-col sm:flex-col lg:w-[50%] lg:mx-auto lg:gap-20 xs:ml-4 xxs:ml-4 sm:ml-4 xs:gap-4 xxs:gap-4 sm:gap-4">
          <div className="flex flex-col lg:w-[50%]">
            <h2 className="font-bold xs:mb-2 xxs:mb-2 sm:mb-2">
              {t("overview")}
            </h2>
            <p className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
              {project.description}
            </p>
          </div>
          <div>
            <div>
              <span className="font-bold">{t("min_investment")} :</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                1000tk
              </span>
            </div>
            <div>
              <span className="font-bold">{t("projected_roi")} :</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                {project.projectedROI}
              </span>
            </div>
            <div>
              <span className="font-bold">{t("investment_startdate")}:</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-bold">{t("risk_grade")} :</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                A
              </span>
            </div>
          </div>
        </div>
        {/* Accordion Section */}
        <div className="mt-12 w-[80%] lg:w-[50%] xs:mb-4 xxs:mb-4 sm:mb-4 mx-auto">
          <div className="collapse collapse-plus border border-base-300 rounded-box">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              {t("funding_help")}
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.fundingHelp}</p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 rounded-box mt-4">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              {t("return_investment")}
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.returnPlan}</p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 rounded-box mt-4">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              {t("business_safety")}
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.businessSafety}</p>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-12 w-[80%] lg:w-[50%] mx-auto">
          <h2 className="text-xl font-bold mb-4">{t("comments")}</h2>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              placeholder={t("add_comment")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-2"
              onClick={handleCommentSubmit}
            >
              {t("add_comment_button")}
            </button>
          </div>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="mb-4 p-2 border border-black rounded"
                >
                  <p>{comment.text}</p>
                  <p className="text-sm text-gray-400">
                    - {comment.userId.name}
                  </p>
                  {userdata?.name === comment.userId.name && (
                    <button
                      className="float-right btn btn-sm btn-outline  "
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      {t("delete_comment")}
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline mt-2 mr-2"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        toast.error(t("login_required"));
                        return;
                      }
                      setReplyingTo(
                        replyingTo === comment._id ? null : comment._id
                      );
                    }}
                  >
                    {t("reply")}
                  </button>

                  {replyingTo === comment._id && (
                    <div className="mt-2">
                      <textarea
                        className="w-full p-2 border rounded"
                        rows="2"
                        placeholder={t("write_reply")}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                      ></textarea>
                      <button
                        className="btn btn-sm btn-primary mt-2"
                        onClick={() => handleReplySubmit(comment._id)}
                      >
                        {t("submit_reply")}
                      </button>
                    </div>
                  )}
                  <button
                    className="btn btn-sm btn-outline mt-2"
                    onClick={() => {
                      loadReplies(comment._id);
                      toggleRepliesVisibility(comment._id);
                    }}
                  >
                    {showRepliesToggle[comment._id]
                      ? t("hide_replies")
                      : t("show_replies")}
                  </button>

                  {/* Replies Section */}
                  {showRepliesToggle[comment._id] && (
                    <div className="mt-2 ml-4">
                      {replies[comment._id]?.map((reply) => (
                        <div
                          key={reply._id}
                          className="p-2 border-l border-gray-400 ml-4"
                        >
                          <p>{reply.text}</p>
                          <p className="text-sm text-gray-400">
                            - {reply.userId.name}
                          </p>
                          {userdata?.name === reply.userId.name && (
                            <button
                              className="btn btn-sm btn-outline text-black mt-2"
                              onClick={() =>
                                handleDeleteReply(comment._id, reply._id)
                              }
                            >
                              {t("delete_reply")}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="mb-6">{t("no_comments")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
