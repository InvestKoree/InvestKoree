import ShariahPost from "../Pages/ShariahPost";
import { useEffect, useState } from "react";
import "animate.css";

const Shariah = () => {
  const [Shariahpost, setShariahPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedSector, setSelectedSector] = useState(""); // State for selected sector
  const [selectedDuration, setSelectedDuration] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000"; // State for selected duration
  const [showRightCol, setShowRightCol] = useState(false);
  const [animateRightCol, setAnimateRightCol] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/founderpost/latestposts`);
        const data = await response.json();

        // Filter posts for Shariah category
        const filteredPosts = data.filter(
          (post) => post.businessCategory === "Shariah"
        );

        setShariahPost(filteredPosts);
        setFilteredPosts(filteredPosts); // Initialize filtered posts
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Function to handle sector selection
  const handleSectorClick = (sector) => {
    setSelectedSector(sector); // Set the selected sector
  };

  const toggleRightCol = () => {
    if (showRightCol) {
      // Add the fade-out animation before hiding the column
      setAnimateRightCol(true);
      setTimeout(() => {
        setShowRightCol(false); // Hide after animation
        setAnimateRightCol(false); // Reset animation state
      }, 1000); // Match the animation duration in milliseconds
    } else {
      setShowRightCol(true);
    }
  };
  // Function to handle duration selection
  const handleDurationClick = (duration) => {
    setSelectedDuration(duration); // Set the selected duration
  };

  // Function to filter posts based on sector and duration
  const filterPosts = () => {
    let filtered = [...Shariahpost]; // Start with all Shariahpost

    if (selectedSector) {
      filtered = filtered.filter(
        (post) => post.businessSector === selectedSector
      );
    }

    if (selectedDuration) {
      filtered = filtered.filter(
        (post) => post.investmentDuration === selectedDuration
      );
    }

    setFilteredPosts(filtered); // Update filtered posts
  };

  // Watch for changes in sector or duration to filter posts
  useEffect(() => {
    filterPosts(); // Apply filter when sector or duration changes
  }, [selectedSector, selectedDuration]);

  // Function to clear filters
  const clearFilters = () => {
    setSelectedSector(""); // Reset sector selection
    setSelectedDuration(""); // Reset duration selection
    setFilteredPosts(Shariahpost); // Show all posts again
  };

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
          <p className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl xxs:text-xl md:mb-2 xs:mb-2 xxs:mb-2 sm:mb-2 font-bold lg:mt-12 md:mt-12 text-center">
            Shariah Business
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1200px] lg:mx-auto sm:mx-auto lg:gap-6 xs:gap-8 xxs:gap-8 sm:gap-8 px-6 lg:px-20 cursor-pointer">
            {filteredPosts.map((item) => (
              <ShariahPost key={item._id} item={item} />
            ))}
          </div>
        </div>

        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full lg:w-80 p-4">
            <li className="font-extrabold  text-salmon xs:mt-6 xxs:mt-6 sm:mt-6 hover:text-white text-lg mb-2">
              <a>Sector</a>
            </li>
            <div className="flex flex-row gap-2 mb-2">
              <div>
                {/* Add onClick handlers to filter posts by sector */}
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Retail" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Retail")}
                >
                  <a>Retail</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Financial" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Financial")}
                >
                  <a>Financial</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Farming" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Farming")}
                >
                  <a>Farming</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Clothing" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Clothing")}
                >
                  <a>Clothing</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Health" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Health")}
                >
                  <a>Health</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Arts" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Arts")}
                >
                  <a>Arts</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Comics" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Comics")}
                >
                  <a>Comics</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Crafts" ? "bg-salmon text-white" : ""
                  }`}
                  onClick={() => handleSectorClick("Crafts")}
                >
                  <a>Crafts</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Photography"
                      ? "bg-salmon text-white"
                      : ""
                  }`}
                  onClick={() => handleSectorClick("Photography")}
                >
                  <a>Photography</a>
                </li>
                <li
                  className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                    selectedSector === "Publishing"
                      ? "bg-salmon text-white"
                      : ""
                  }`}
                  onClick={() => handleSectorClick("Publishing")}
                >
                  <a>Publishing</a>
                </li>
              </div>
              {showRightCol && (
                <div
                  className={`${
                    animateRightCol
                      ? "animate__animated animate__fadeOut"
                      : "animate__animated animate__fadeInTopRight"
                  }`}
                >
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg   ${
                      selectedSector === "Dance" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Dance")}
                  >
                    <a>Dance</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Design" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Design")}
                  >
                    <a>Design</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Fashion" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Fashion")}
                  >
                    <a>Fashion</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Film" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Film")}
                  >
                    <a>Film </a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Food" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Food")}
                  >
                    <a>Food</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Games" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Games")}
                  >
                    <a>Games</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Journalism"
                        ? "bg-salmon text-white"
                        : ""
                    }`}
                    onClick={() => handleSectorClick("Journalism")}
                  >
                    <a>Journalism</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Music" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Music")}
                  >
                    <a>Music</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Tecnhology"
                        ? "bg-salmon text-white"
                        : ""
                    }`}
                    onClick={() => handleSectorClick("Tecnhology")}
                  >
                    <a>Tecnhology</a>
                  </li>
                  <li
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === "Theater" ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick("Theater")}
                  >
                    <a>Theater</a>
                  </li>
                </div>
              )}
            </div>
            <button
              onClick={toggleRightCol}
              className="toggle-btn btn bg-gray-500 text-white w-full font-bold text-lg rounded-lg hover:text-black"
            >
              {showRightCol ? "View Less" : "View More"}
            </button>
            <li className="font-extrabold text-salmon hover:text-white text-lg mb-2 mt-6">
              <a>Duration</a>
            </li>
            {/* Add onClick handlers to filter posts by duration */}
            <li
              className={`font-bold hover:bg-salmon hover:text-white text-lg  rounded-lg ${
                selectedDuration === "short-term" ? "bg-salmon text-white" : ""
              }`}
              onClick={() => handleDurationClick("short-term")}
            >
              <a>Short term</a>
            </li>
            <li
              className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                selectedDuration === "mid-term" ? "bg-salmon text-white" : ""
              }`}
              onClick={() => handleDurationClick("mid-term")}
            >
              <a>Mid term</a>
            </li>
            <li
              className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                selectedDuration === "long-term" ? "bg-salmon text-white" : ""
              }`}
              onClick={() => handleDurationClick("long-term")}
            >
              <a>Long term</a>
            </li>

            {/* Clear Filter Option */}
            <li className="mt-6">
              <button
                onClick={clearFilters}
                className="btn bg-gray-500 text-white w-full font-bold text-lg rounded-lg hover:text-black"
              >
                Clear Filters
              </button>
            </li>
            <div className="mt-6">
              {/* <p className="font-bold  text-xl">Selected Filters:</p> */}
              {selectedSector && (
                <li className="text-lg font-bold rounded-lg text-white bg-salmon  my-2">
                  <a>{selectedSector}</a>
                </li>
              )}
              {selectedDuration && (
                <li className="text-lg font-bold rounded-lg text-white mt-4 bg-salmon">
                  <a>{selectedDuration}</a>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shariah;
