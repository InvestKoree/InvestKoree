import { useEffect, useState } from "react";
import bannerpic from "../assets/bannernew.png";
import halal from "../assets/halal.png";
import time from "../assets/time.png";
import bannerpic2 from "../assets/bannernew2.jpg";
import inflation from "../assets/inflation.jpg";
import LatestPost from "./LatestPost";
import { Link } from "react-router-dom";
import "animate.css";
import { Parallax } from "react-parallax";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "animate.css";
import mission2 from "../assets/mission2.jpg";
import { AiOutlineSearch } from "react-icons/ai";
import mission4 from "../assets/mission4.jpg";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to the search results page with the search term
      navigate(`/search?businessName=${encodeURIComponent(searchTerm)}`);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  // Fetch posts and scroll percentage logic

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/founderpost/latestposts`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setLatestPosts(data);
        } else {
          console.error("Expected an array but got:", data);
          setLatestPosts([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.25 },
    },
  };

  return (
    <div>
      <div className="">
        <form
          onSubmit={handleSearch}
          className="flex flex-row relative my-4  lg:hidden"
        >
          <input
            type="text"
            placeholder="Search By Businessname"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-salmon rounded-l-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-salmon text-white rounded-r-md p-2 absolute right-2"
          >
            <AiOutlineSearch />
          </button>
        </form>
      </div>

      {/* Hero Section */}
      <div>
        <Parallax
          bgImage={isSmallScreen ? bannerpic2 : bannerpic}
          className="lg:h-full animate__fadeIn animate__animated bg-img"
          strength={300}
        >
          <div className="hero h-[400px] lg:h-[600px] xs:w-full sm:w-full xxs:w-full flex lg:items-center text-slate-700">
            <div className="hero-content xs:w-[90%] sm:w-[90%] flex-col gap-8 lg:gap-24 xxs:justify-start xxs:items-start sm:items-start xs:items-start lg:items-start lg:ml-8 lg:justify-start">
              <div className="lg:text-left xxs:text-left">
                <p className="xs:text-3xl sm:text-3xl xxs:text-3xl lg:text-6xl xs:mt-8 sm:mt-8 xxs:mt-8 lg:text-white animate__animated animate__fadeInDownBig font-bold sm:text-white xs:text-white xxs:text-white">
                  {t("welcome")} <br />
                  {t("title")}
                </p>
                <p className="py-3 lg:text-2xl animate__animated animate__fadeInUpBig lg:text-white flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col sm:font-semibold xs:font-semibold xxs:font-semibold sm:text-xl xs:text-xl xxs:text-xl sm:text-white xs:text-white xxs:text-white">
                  {t("easy_fast")} <br />
                  {t("get_profit_faster")}
                </p>
                <Link to="/shariah">
                  <button className="btn btn-active btn-neutral animate__animated animate__fadeInUpBig">
                    {t("get_started")} {/* Use translation */}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Parallax>

        {isSmallScreen ? (
          <>
            <h5 className="text-center lg:mt-20 lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl  xs:mb-6 xxs:mb-6 sm:mb-6 xs:mt-16 xxs:mt-16 sm:mt-16 font-bold">
              {t("currently_running_investments")} {/* Use translation */}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1300px] lg:mx-auto sm:mx-auto lg:gap-6 xxs:gap-8 xs:gap-8 px-6 lg:px-20 cursor-pointer">
              {Array.isArray(latestPosts) &&
                latestPosts.map((item) => (
                  <LatestPost key={item._id} item={item} />
                ))}
            </div>
            <Link to="/shariah">
              <button className="btn  absolute right-40 mt-4 ">See All</button>
            </Link>
          </>
        ) : (
          <>
            <motion.h5
              className="text-center lg:mt-20 lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl xs:mb-6 xxs:mb-6 sm:mb-6 xs:mt-16 xxs:mt-16 sm:mt-16 font-bold"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {t("currently_running_investments")} {/* Use translation */}
            </motion.h5>
            <Link to="/shariah">
              <button className="btn btn-transparent absolute right-40  mt-24">
                See All
              </button>
            </Link>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1300px] lg:mx-auto sm:mx-auto lg:gap-6 xs:gap-8 px-6 lg:px-20 cursor-pointer"
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {latestPosts.map((item) => (
                <LatestPost key={item._id} item={item} />
              ))}
            </motion.div>
          </>
        )}
      </div>
      <div className="flex flex-col my-20 mx-auto">
        <h2 className="mx-auto lg:text-3xl sm:text-xl lg:mb-16 xs:text-xl xxs:text-xl xs:mb-6 xxs:mb-6 sm:mb-6 xs:mt-16 xxs:mt-16 sm:mt-16 font-bold">
          {t("loginvideo")}{" "}
        </h2>

        {/* Video Section */}
        <div className="flex lg:flex-row xs:flex-col xxs:flex-col sm:flex-col justify-center lg:space-x-10">
          {/* For Investors Video */}
          <div className="flex flex-col  items-center">
            <h3 className="text-lg font-bold mb-6">{t("for_founders")}</h3>
            <iframe
              width="380"
              height="250"
              src="https://www.youtube.com/embed/A8S-aUYqz34"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* For Founders Video */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold lg:mt-0 xs:mt-8 xxs:mt-8 sm:mt-8 mb-6">
              {t("for_investors")}
            </h3>
            <iframe
              width="380"
              height="250"
              src="https://www.youtube.com/embed/m_iQ4nc7oGg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col lg:mx-auto lg:w-[1600px] lg:gap-5 lg:my-24 xs:p-4 xxs:p-4 sm:p-6 ">
        <div className="lg:flex lg:items-center lg:flex-col">
          <img src={halal} alt="shariah-img" className="h-32 w-32 mb-6" />
          <h3 className="font-bold text-lg mb-2">Shariah First</h3>
          <p className="lg:text-center">
            Halal options only. Our internationally recognized Shariah advisors
            make sure that your profits are always halal.
          </p>
        </div>
        <div className="lg:flex lg:items-center lg:flex-col">
          <img src={time} alt="shariah-img" className="h-32 w-32 mb-6" />
          <h3 className="font-bold text-lg mb-2"> Hassle-free</h3>
          <p className="lg:text-center">
            We take care of business assessment, legal contracts and repayments.
            You just choose which business you want to invest in.
          </p>
        </div>
        <div className="lg:flex lg:items-center lg:flex-col">
          <img src={inflation} alt="shariah-img" className="h-32 w-32 mb-6" />
          <h3 className="font-bold text-lg mb-2"> Beating Inflation</h3>
          <p className="lg:text-center">
            Higher profits offered from traditional investment options. Preserve
            the value of your hard-earned money.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section my-20 flex flex-col lg:flex-col gap-10 justify-center lg:h-full items-center">
        <div className="flex flex-col lg:flex-row gap-8 animate__bounceInLeft animate__animated">
          <img
            className="rounded-xl sm:w-[200px] xs:w-[200px] xxs:w-[200px] lg:h-[550px] lg:w-[350px]"
            src={mission2}
            alt="mission pic"
          />
          <img
            className="rounded-xl sm:w-[200px] xs:w-[200px] xxs:w-[200px] lg:w-[350px] lg:h-[550px] lg:mt-8"
            src={mission4}
            alt=""
          />
        </div>
        <div className="flex flex-col text-center lg:w-[1200px] sm:p-4 xs:p-4 xxs:p-4">
          <p className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold">
            {t("our_mission")} {/* Use translation */}
          </p>
          <h1 className="mt-4 lg:text-xl mb-10">
            {t("empowering_businesses")} {/* Use translation */}
          </h1>
          <p className="lg:text-left sm:text-left xs:text-left xxs:text-left lg:text-lg">
            {t("mission")}
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            {t("how_investkoree_works")} {/* Use translation */}
          </h2>
          <p className="mt-8 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            1. {t("step_1_register")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("step_1_description")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("step_2_explore")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("step_2_description")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("step_3_build")} {/* Use translation */}
          </p>
          <p className="lg:text-center sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("step_3_description")} {/* Use translation */}
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            {t("why_choose_investkoree")} {/* Use translation */}
          </h2>
          <p className="mt-8 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("tailored_solutions")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("tailored_solutions_description")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("verified_investors")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("verified_investors_description")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("proven_success")} {/* Use translation */}
          </p>
          <p className="lg:text-center sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("proven_success_description")} {/* Use translation */}
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            {t("your_guide_to_investment")} {/* Use translation */}
          </h2>
          <p className="mt-4 lg:text-xl mb-10">
            {t("explore_latest_trends")} {/* Use translation */}
          </p>
          <p className="mt-8 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("top_5_business_sectors")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("learn_where_investors")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("how_to_attract_investors")} {/* Use translation */}
          </p>
          <p className="lg:text-center mb-4 sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("tips_to_present_business")} {/* Use translation */}
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center sm:text-center xs:text-center xxs:text-center">
            {t("success_stories")} {/* Use translation */}
          </p>
          <p className="lg:text-center sm:text-center xs:text-center xxs:text-center lg:text-lg">
            {t("inspiration_from_examples")} {/* Use translation */}
          </p>
          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-4xl font-bold text-center text-gray-900 mb-12">
              {t("our_services")} {/* Use translation */}
            </p>
            <ul className="max-w-4xl mx-auto space-y-8">
              {/* Service Item 1 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("business_investor_matchmaking")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("business_investor_matchmaking_description")}{" "}
                  {/* Use translation */}
                </p>
              </li>

              {/* Service Item 2 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("business_analysis")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("business_analysis_description")} {/* Use translation */}
                </p>
              </li>

              {/* Service Item 3 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("investor_outreach")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("investor_outreach_description")} {/* Use translation */}
                </p>
              </li>

              {/* Service Item 4 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("market_insights")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("market_insights_description")} {/* Use translation */}
                </p>
              </li>

              {/* Service Item 5 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("consulting_advisory")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("consulting_advisory_description")} {/* Use translation */}
                </p>
              </li>

              {/* Service Item 6 */}
              <li className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {t("resource_center")} {/* Use translation */}
                </p>
                <p className="text-lg text-gray-600">
                  {t("resource_center_description")} {/* Use translation */}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <section className="customer-review my-32">
        <p className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-center mb-4 text-gray-900 font-bold">
          {t("success_stories2")} {/* Use translation */}
        </p>
        <p className="text-center lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl lg:text-bold sm:text-bold xs:text-bold xxs:text-bold mb-16">
          {t("hear_from_businesses")} {/* Use translation */}
        </p>
        <div className="flex flex-col sm:flex-row sm:mx-4 xs:mx-4 xxs:mx-4 gap-6 items-center justify-center">
          {/* Sample Testimonial 1 */}
          <div className="bg-white w-full sm:w-[35%] lg:w-[40%] hover:bg-salmon rounded-lg sm:h-56 xs:h-56 xxs:h-56 testimonial-card shadow-md p-6 group">
            <div className="flex items-center testimonial-card-content">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-white">
                  {t("testimonial_1_name")}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-white">
                  {t("testimonial_1_role")}
                </p>
              </div>
            </div>
            <div className="mt-4 testimonial-card-content">
              <p className="text-gray-700 group-hover:text-white">
                {t("testimonial_1_text")}
              </p>
            </div>
          </div>

          {/* Sample Testimonial 2 */}
          <div className="bg-white w-full sm:w-[35%] lg:w-[40%] hover:bg-salmon sm:h-56 xs:h-56 xxs:h-56 rounded-lg testimonial-card shadow-md p-6 group">
            <div className="flex items-center testimonial-card-content">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-white">
                  {t("testimonial_2_name")}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-white">
                  {t("testimonial_2_role")}
                </p>
              </div>
            </div>
            <div className="mt-4 testimonial-card-content">
              <p className="text-gray-700 group-hover:text-white">
                {t("testimonial_2_text")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
