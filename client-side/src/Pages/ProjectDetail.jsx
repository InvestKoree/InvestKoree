import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProjectDetail = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null); // State to hold project data
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("images");
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const [comments, setComments] = useState([]); // State to hold comments
  const [newComment, setNewComment] = useState(""); // State for the new comment input

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

  // Handle adding a new comment
  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be signed in to comment.");
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
      if (response.status === 200) {
        setNewComment(""); // Clear the input field
        fetchComments(project._id); // Refresh comments for this project
        toast.success("Comment added successfully!");
        console.log("Comment added:", response.data); // Log the response to check if it's successful
      }
      if (response.status === 201) {
        setNewComment(""); // Clear the input field
        fetchComments(project._id); // Refresh the comments list
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
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
        toast.success("Project added to watchlist!");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error("Failed to add project to watchlist.");
    }
  };

  const checkIfAddedToWatchlist = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/watchlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const watchlist = response.data.watchlist;
      console.log("Updated Watchlist:", watchlist);
      if (watchlist && watchlist.posts.some((post) => post._id === postId)) {
        setIsAddedToWatchlist(true);
      }
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
        throw new Error("Failed to send investment data");
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

  return (
    <div>
      <div className="h-50">
        {/* Image and Video Section */}
        <div className="hero flex justify-center">
          <div className="hero-content flex-col lg:flex-row items-center">
            <div>
              <div className="relative w-[full] max-w-md mx-auto">
                {viewMode === "images" ? (
                  <div className="carousel carousel-vertical rounded-box transform  transition-transform duration-300 ease-in-out delay-150 hover:scale-125 h-96">
                    {project.businessPicture.map((src, index) => (
                      <div
                        key={index}
                        className={`carousel-item h-full lg:mb-10 ${
                          currentSlide === index ? "block" : "hidden"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="object-cover w-full h-full mb-10"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="video-container rounded-md h-96">
                    {project.video ? (
                      <video
                        src={project.video}
                        controls
                        className="object-cover w-full h-full rounded-md"
                      />
                    ) : (
                      <div>No video available</div>
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
                  Images
                </button>
                <button
                  onClick={() => handleViewModeChange("video")}
                  className={`btn ${
                    viewMode === "video" ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Video
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
                    <span className="text-salmon lg:text-2xl">70000 Taka</span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      Raised
                    </div>
                  </div>
                  <div className="bg-base-200 lg:p-4 xs:p-2 xxs:p-2 sm:p-2 xs:w-[25%] xxs:w-[25%] sm:w-[25%] flex flex-col lg:w-44 lg:h-20 rounded-lg xs:mx-auto xxs:mx-auto sm:mx-auto">
                    <span className="text-salmon lg:text-2xl overflow-x-auto">
                      {/* {project.fundingAmount} Taka */}700000 taka
                    </span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      Goal
                    </div>
                  </div>
                  <div className="bg-base-200 lg:p-4 xs:p-2 xxs:p-2 sm:p-2 xs:w-[25%] xxs:w-[25%] sm:w-[25%] flex flex-col lg:w-44 lg:h-20 rounded-lg xs:mx-auto xxs:mx-auto sm:mx-auto">
                    <span className="text-salmon lg:text-2xl">
                      {project.investmentDuration}
                    </span>
                    <div className="xs:text-sm xxs:text-sm sm:text-sm">
                      Duration
                    </div>
                  </div>
                </div>
                <div className="lg:w-full xs:w-[95%] xxs:w-[95%] sm:w-[95%] bg-gray-200 rounded-full h-2.5 mt-8 mb-2 xs:mx-auto xxs:mx-auto sm:mx-auto">
                  <div
                    className="bg-salmon h-2.5 rounded-full"
                    style={{
                      width: `${80}%`,
                    }}
                  ></div>
                </div>
                <div className="flex xs:ml-2 xxs:ml-2 sm:ml-2 lg:justify-between xs:justify-between xxs:justify-between sm:justify-between text-sm">
                  <div>Raised :</div>
                  <div className="xs:mr-2 xxs:mr-2 sm:mr- 2">{80}%</div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button
                  onClick={handleInvestClick}
                  className="btn xs:w-[60%] xxs:w-[60%] sm:w-[60%] login-btn"
                >
                  Invest
                </button>
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
            <h2 className="font-bold xs:mb-2 xxs:mb-2 sm:mb-2">Overview</h2>
            <p className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
              {project.description}
            </p>
          </div>
          <div>
            <div>
              <span className="font-bold">Min Investment :</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                {project.returndate} Taka
              </span>
            </div>
            <div>
              <span className="font-bold">Projected ROI :</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                {project.projectedROI}%
              </span>
            </div>
            <div>
              <span className="font-bold">Investment Startdate:</span>
              <span className="text-slate-500 xs:text-sm xxs:text-sm sm:text-sm">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-bold">Risk Grade :</span>
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
              How Would The Funding Help You
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.fundingHelp}</p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 rounded-box mt-4">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How Do You Plan To Return The Investment
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.returnPlan}</p>
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 rounded-box mt-4">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How Safe Do You Consider Your Business To Be?
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.businessSafety}</p>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-12 w-[80%] lg:w-[50%] xs:mb-4 xxs:mb-4 sm:mb-4 mx-auto">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-2"
              onClick={handleCommentSubmit}
            >
              Add Comment
            </button>
          </div>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="mb-4 p-2 border rounded">
                  <p className="text-slate-500">{comment.text}</p>
                  <p className="text-sm text-gray-400">
                    - User ID: {comment.userId._id}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
