import ShariahPost from "../Pages/ShariahPost";
import { useEffect, useState } from "react";
import "animate.css";
import { useTranslation } from "react-i18next";

const Shariah = () => {
  const { t } = useTranslation();
  const [Shariahpost, setShariahPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [activeTab, setActiveTab] = useState("ongoing");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Comprehensive list of sectors
  const allSectors = [
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
  ];

  // Durations list
  const allDurations = ["short-term", "mid-term", "long-term"];

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
        setFilteredPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPosts();
  }, [API_URL]); // Added API_URL as a dependency

  // Function to filter posts based on the active tab
  const getPostsByTab = () => {
    const today = new Date();
    return filteredPosts.filter((post) => {
      const returnDate = new Date(post.returndate);
      if (activeTab === "ongoing") {
        return returnDate.toDateString() < today.toDateString(); // Ongoing if return date is in the future
      } else if (activeTab === "soldOut") {
        return returnDate.toDateString() === today.toDateString(); // Sold out if return date is today
      } else if (activeTab === "upcoming") {
        return returnDate.toDateString() > today.toDateString(); // Upcoming if return date is in the past
      }
      return true; // Default case
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Function to count ideas per sector
  const getSectorCounts = () => {
    const sectorCounts = {};
    allSectors.forEach((sector) => {
      sectorCounts[sector] = Shariahpost.filter(
        (post) => post.businessSector === sector
      ).length;
    });
    return sectorCounts;
  };

  // Function to count ideas per duration
  const getDurationCounts = () => {
    const durationCounts = {};
    allDurations.forEach((duration) => {
      durationCounts[duration] = Shariahpost.filter(
        (post) => post.investmentDuration === duration
      ).length;
    });
    return durationCounts;
  };

  const sectorCounts = getSectorCounts();
  const durationCounts = getDurationCounts();

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
  };

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
  };

  const filterPosts = () => {
    let filtered = [...Shariahpost];

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

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    filterPosts();
  }, [selectedSector, selectedDuration, Shariahpost]); // Added Shariahpost as a dependency

  const clearFilters = () => {
    setSelectedSector("");
    setSelectedDuration("");
    setFilteredPosts(Shariahpost);
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
          <p className="lg:text-3xl md:text-2xl lg:mb-12 sm:text-xl xs:text-xl xxs:text-xl md:mb-2 xs:mb-2 xxs:mb-2 sm:mb-2 font-bold lg:mt-12 md:mt-12 text-center">
            {t("shariah_business")}
          </p>
          <div
            role="tablist"
            className="tabs tabs-box mb-4 p-2 border lg:w-[1200px] mx-auto border-gray-300 rounded-lg"
          >
            <a
              role="tab"
              className={`tab ${
                activeTab === "soldOut"
                  ? "tab-active bg-salmon rounded-lg text-white"
                  : ""
              }`}
              onClick={() => handleTabChange("soldOut")}
            >
              Sold Out
            </a>
            <a
              role="tab"
              className={`tab ${
                activeTab === "ongoing"
                  ? "tab-active bg-salmon rounded-lg text-white"
                  : ""
              }`}
              onClick={() => handleTabChange("ongoing")}
            >
              Ongoing
            </a>

            <a
              role="tab"
              className={`tab ${
                activeTab === "upcoming"
                  ? "tab-active bg-salmon rounded-lg text-white"
                  : ""
              }`}
              onClick={() => handleTabChange("upcoming")}
            >
              Upcoming
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1200px] lg:mx-auto sm:mx-auto lg:gap-6 xs:gap-8 xxs:gap-8 sm:gap-8 px-6 lg:px-20 cursor-pointer">
            {getPostsByTab().map((item) => (
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
            <li className="font-extrabold text-salmon xs:mt-6 xxs:mt-6 sm:mt-6 hover:text-white text-lg mb-2">
              <a>{t("sector")}</a>
            </li>

            {/* Sector Dropdown */}
            <div className="form-control w-full mb-4">
              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedSector}
                onChange={handleSectorChange}
              >
                <option value="">{t("select_sector")}</option>
                {allSectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {t(sector.toLowerCase())} ({sectorCounts[sector]})
                  </option>
                ))}
              </select>
            </div>

            <li className="font-extrabold text-salmon hover:text-white text-lg mb-2 mt-6">
              <a>{t("duration")}</a>
            </li>
            {allDurations.map((duration) => (
              <li
                key={duration}
                className={`font-bold hover:bg-salmon hover:text-white mt-2 text-lg rounded-lg flex flex-row ${
                  selectedDuration === duration ? "bg-salmon text-white" : ""
                }`}
                onClick={() => handleDurationClick(duration)}
              >
                <a className="px-0 pl-2">{t(duration)}</a>
                <span className="text-xs mt-2  px-1">
                  ({durationCounts[duration]})
                </span>
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
              {selectedSector && (
                <li className="text-lg font-bold rounded-lg text-white bg-salmon my-2">
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
