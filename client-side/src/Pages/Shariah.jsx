import ShariahPost from "../Pages/ShariahPost";
import { useEffect, useState } from "react";
import "animate.css";
import { useTranslation } from "react-i18next";

const Shariah = () => {
  const { t } = useTranslation();
  const [Shariahpost, setShariahPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedSector, setSelectedSector] = useState(""); // State for selected sector
  const [selectedDuration, setSelectedDuration] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // State for selected duration
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
            {t("shariah_business")}
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
              <a>{t("sector")}</a>
            </li>
            <div className="flex flex-row gap-2 mb-2">
              <div>
                {/* Add onClick handlers to filter posts by sector */}
                {[
                  "Retail",
                  "Financial",
                  "Farming",
                  "Clothing",
                  "Health",
                  "Arts",
                  "Comics",
                  "Crafts",
                  "Photography",
                  "Publishing",
                ].map((sector) => (
                  <li
                    key={sector}
                    className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                      selectedSector === sector ? "bg-salmon text-white" : ""
                    }`}
                    onClick={() => handleSectorClick(sector)}
                  >
                    <a>{t(sector.toLowerCase())}</a>
                  </li>
                ))}
              </div>
              {showRightCol && (
                <div
                  className={`${
                    animateRightCol
                      ? "animate__animated animate__fadeOut"
                      : "animate__animated animate__fadeInTopRight"
                  }`}
                >
                  {[
                    "Dance",
                    "Design",
                    "Fashion",
                    "Film",
                    "Food",
                    "Games",
                    "Journalism",
                    "Music",
                    "Technology",
                    "Theater",
                  ].map((sector) => (
                    <li
                      key={sector}
                      className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                        selectedSector === sector ? "bg-salmon text-white" : ""
                      }`}
                      onClick={() => handleSectorClick(sector)}
                    >
                      <a>{t(sector.toLowerCase())}</a>
                    </li>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleRightCol}
              className="toggle-btn btn bg-gray-500 text-white w-full font-bold text-lg rounded-lg hover:text-black"
            >
              {showRightCol ? t("view_less") : t("view_more")}
            </button>
            <li className="font-extrabold text-salmon hover:text-white text-lg mb-2 mt-6">
              <a>{t("duration")}</a>
            </li>
            {/* Add onClick handlers to filter posts by duration */}
            {["short-term", "mid-term", "long-term"].map((duration) => (
              <li
                key={duration}
                className={`font-bold hover:bg-salmon hover:text-white text-lg rounded-lg ${
                  selectedDuration === duration ? "bg-salmon text-white" : ""
                }`}
                onClick={() => handleDurationClick(duration)}
              >
                <a>{t(duration)}</a>
              </li>
            ))}

            {/* Clear Filter Option */}
            <li className="mt-6">
              <button
                onClick={clearFilters}
                className="btn bg-gray-500 text-white w-full font-bold text-lg rounded-lg hover:text-black"
              >
                {t("clear_filters")}
              </button>
            </li>
            <div className="mt-6">
              {/* <p className="font-bold  text-xl">Selected Filters:</p> */}
              {selectedSector && (
                <li className="text-lg font-bold rounded-lg text-white bg-salmon  my-2">
                  <a>{t(selectedSector.toLowerCase())}</a>
                </li>
              )}
              {selectedDuration && (
                <li className="text-lg font-bold rounded-lg text-white mt-4 bg-salmon">
                  <a>{t(selectedDuration)}</a>
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
