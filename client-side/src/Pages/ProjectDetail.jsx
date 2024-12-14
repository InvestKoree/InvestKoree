import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../providers/AuthProvider";
// import useFormatDate from "../hooks/useFormatDate";
const ProjectDetail = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null); // State to hold project data
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
  // const { userdata } = useAuth();
  const [viewMode, setViewMode] = useState("images");

  const navigate = useNavigate();

  // State for the current slide

  useEffect(() => {
    // Fetch project details from the backend
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/founderpost/projectdetail/${id}`
        ); // Replace with your API URL
        const data = await response.json();
        setProject(data); // Set the project data in state
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }
  console.log(project);
  const handleInvestClick = async () => {
    console.log("Button clicked");

    const post = {
      _id: id,
      businessName: project.businessName,
      returndate: project.returndate,
      startDate: project.startDate,
      // userId: userdata._id,
    };
    // Check the selected post object

    try {
      const response = await fetch("http://localhost:10000/investments/post", {
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

  // Image sources from the project data
  // const images = project.images || [];
  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];

  const videoSrc = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const formattedStartDate = new Date(project.startDate).toLocaleDateString();

  return (
    <div>
      <div className="min-h-screen">
        {/* Image and Video Section */}
        <div className="hero flex justify-center">
          <div className="hero-content flex-col lg:flex-row items-center">
            <div>
              <div className="relative w-[full] max-w-md mx-auto">
                {viewMode === "images" ? (
                  <div className="carousel carousel-vertical rounded-box transform transition-transform duration-300 ease-in-out delay-150 hover:scale-125 h-96">
                    {images.map((src, index) => (
                      <div
                        key={index}
                        className={`carousel-item  h-full ${
                          currentSlide === index ? "block" : "hidden"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Slide ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="video-container rounded-md h-96">
                    <video
                      src={videoSrc}
                      controls
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}

                {/* Dot Navigation for Images */}
                {viewMode === "images" && (
                  <div className="flex justify-center mt-4">
                    {images.map((_, index) => (
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
                      {project.fundingAmount} Taka
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
                      width: `${(70000 / project.fundingAmount) * 100}%`,
                    }} // Calculate percentage
                  ></div>
                </div>
                <div className="flex xs:ml-2 xxs:ml-2 sm:ml-2 lg:justify-between xs:justify-between xxs:justify-between sm:justify-between text-sm">
                  <div>Raised :</div>
                  <div className="xs:mr-2 xxs:mr-2 sm:mr-2">
                    {((70000 / project.fundingAmount) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <button
                onClick={handleInvestClick}
                className="btn xs:w-[60%] xxs:w-[60%] sm:w-[60%] login-btn"
              >
                Invest
              </button>
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
                {formattedStartDate}
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
              {/* Assuming project has a returnPlan field */}
            </div>
          </div>

          <div className="collapse collapse-plus border border-base-300 rounded-box mt-4">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              How Safe Do You Consider Your Business To Be?
            </div>
            <div className="collapse-content peer-checked:block">
              <p>{project.businessSafety}</p>
              {/* Assuming project has a safetyAssessment field */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
