import { useEffect, useState } from "react";
import bannerpic from "../assets/bannernew.png";
import bannerpic2 from "../assets/bannernew2.jpg";
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

const Home = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [ref2, inView2] = useInView({ threshold: 0.2 });
  const [refWhy, inViewWhy] = useInView({ threshold: 0.2 });

  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (inView2) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView2]);

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
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.05,
      },
    },
  };
  const textVariants2 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.25,
      },
    },
  };
  const whySectionVariants = {
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
          className=" lg:h-full animate__fadeIn animate__animated bg-img  "
          strength={300}
        >
          <div className="hero h-[400px] lg:h-[600px] xs:w-full sm:w-full xxs:w-full  flex lg:items-center  text-slate-700">
            <div className="hero-content xs:w-[90%] sm:w-[90%] flex-col  gap-8 lg:gap-24 xxs:justify-start xxs:items-start sm:items-start xs:items-start lg:items-start lg:ml-8 lg:justify-start ">
              <div className="lg:text-left xxs:text-left ">
                <p className="xs:text-3xl sm:text-3xl xxs:text-3xl lg:text-6xl  xs:mt-8 sm:mt-8 xxs:mt-8 lg:text-white  animate__animated animate__fadeInDownBig font-bold sm:text-white xs:text-white xxs:text-white ">
                  Welcome to <br /> InvestKoree.com
                </p>
                <p className="py-3 lg:text-2xl animate__animated animate__fadeInUpBig lg:text-white flex lg:flex-row sm:flex-col xs:flex-col xxs:flex-col  sm:font-semibold xs:font-semibold xxs:font-semibold sm:text-xl xs:text-xl xxs:text-xl sm:text-white xs:text-white xxs:text-white">
                  It's Easy and Fast to Invest.{" "}
                  <span>Get Profit Faster Here.</span>
                </p>
                <Link to="/shariah">
                  <button className="btn btn-active btn-neutral animate__animated animate__fadeInUpBig ">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Parallax>

        {isSmallScreen ? (
          <>
            <h5 className="text-center lg:mt-20 lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl xs:mb-6 xxs:mb-6 sm:mb-6 xs:mt-16 xxs:mt-16 sm:mt-16 font-bold">
              Currently Running Investments
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1200px] lg:mx-auto sm:mx-auto lg:gap-6  xxs:gap-8 xs:gap-8 px-6 lg:px-20 cursor-pointer">
              {Array.isArray(latestPosts) &&
                latestPosts.map((item) => (
                  <LatestPost key={item._id} item={item} />
                ))}
            </div>
          </>
        ) : (
          <>
            <motion.h5
              className="text-center lg:mt-20 lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl xs:mb-6 xxs:mb-6 sm:mb-6 xs:mt-16 xxs:mt-16 sm:mt-16 font-bold"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              Currently Running Investments
            </motion.h5>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-[1200px] lg:mx-auto sm:mx-auto lg:gap-6 xs:gap-8 px-6 lg:px-20 cursor-pointer"
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
      {/* Mission Section */}
      <motion.div
        ref={refWhy}
        className="mission-section my-20 flex flex-col lg:flex-col gap-10 justify-center lg:h-full items-center"
        variants={whySectionVariants}
        initial="hidden"
        animate={inViewWhy ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row gap-8 animate__bounceInLeft  animate__animated">
          <img
            className="rounded-xl sm:w-[200px]   xs:w-[200px] xxs:w-[200px] lg:h-[550px] lg:w-[350px]"
            src={mission2}
            alt=""
          />
          <img
            className="rounded-xl sm:w-[200px]  xs:w-[200px] xxs:w-[200px] lg:w-[350px] lg:h-[550px] lg:mt-8"
            src={mission4}
            alt=""
          />
        </div>
        <div className="flex flex-col text-center  lg:w-[1200px] sm:p-4  xs:p-4 xxs:p-4">
          <p className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold">
            Our Mission
          </p>
          <h1 className="mt-4 lg:text-xl mb-10">
            Empowering Businesses: Connect with Investors Through InvestKoree
          </h1>
          <p className="lg:text-left  sm:text-left xs:text-left xxs:text-left lg:text-lg">
            Welcome to InvestKoree, the premier platform connecting visionary
            businesses with investors ready to help them grow. Whether you're a
            startup or an established business, we tailor our services to match
            your unique needs. We strive to create a dynamic platform where
            innovative ideas meet financial backing, fostering sustainable
            growth and impactful change. By connecting businesses with the right
            investors, we empower companies to reach their full potential while
            offering investors opportunities to support ventures that align with
            their strategic goals and values.
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            How InvestKoree Works
          </h2>
          <p className="mt-8 font-bold lg:text-xl mb-2  lg:text-center  sm:text-center xs:text-center xxs:text-center">
            1. Step 1: Register Your Business
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Create a profile to showcase your business to potential investors.
            Highlight your goals, vision, and unique selling points.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            Step 2: Explore Investment Opportunities
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Use our intuitive search feature to find investors aligned with your
            industry and values.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            3. Step 3: Build Connections
          </p>
          <p className="lg:text-center  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Connect with verified investors who are ready to help your business
            thrive.
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            Why Choose InvestKoree?
          </h2>
          <p className="mt-8 font-bold lg:text-xl mb-2  lg:text-center  sm:text-center xs:text-center xxs:text-center">
            Tailored Solutions
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            We match businesses with investors based on specific needs and
            goals.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            Verified Investors
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            All our investors undergo a rigorous verification process.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            Proven Success
          </p>
          <p className="lg:text-center  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Businesses have transformed and expanded through InvestKoree’s
            platform.
          </p>
          <h2 className="lg:text-3xl sm:text-xl xs:text-xl xxs:text-xl text-gray-900 font-bold mt-12">
            Your Guide to Business Investment Opportunities
          </h2>
          <p className="mt-4 lg:text-xl mb-10">
            Explore the latest trends, tips, and strategies to attract the right
            investors. Check out our blog for insights:
          </p>
          <p className="mt-8 font-bold lg:text-xl mb-2  lg:text-center  sm:text-center xs:text-center xxs:text-center">
            1. Top 5 Business Sectors for Investment in 2025
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Learn where investors are focusing their attention this year.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            How to Attract the Right Investors to Your Business
          </p>
          <p className="lg:text-center mb-4  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Tips to present your business in the best light.
          </p>
          <p className="mt-4 font-bold lg:text-xl mb-2 lg:text-center  sm:text-center xs:text-center xxs:text-center">
            Success Stories: How InvestKoree Helped Businesses Thrive
          </p>
          <p className="lg:text-center  sm:text-center xs:text-center xxs:text-center lg:text-lg">
            Inspiration from real-world examples.
          </p>
          <div className=" py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-4xl font-bold text-center text-gray-900 mb-12">
              Our Services
            </p>
            <ul className="max-w-4xl mx-auto space-y-8">
              {/* Service Item 1 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Business-Investor Matchmaking
                </p>
                <p className="text-lg text-gray-600">
                  We connect businesses with investors who align with their
                  industry, growth stage, and investment needs.
                </p>
              </li>

              {/* Service Item 2 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Business Analysis & Profiling
                </p>
                <p className="text-lg text-gray-600">
                  Our team analyzes business models, strengths, and market
                  potential to present compelling cases to potential investors.
                </p>
              </li>

              {/* Service Item 3 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Investor Outreach & Engagement
                </p>
                <p className="text-lg text-gray-600">
                  We facilitate direct communication and engagement between
                  businesses and investors to ensure seamless collaboration.
                </p>
              </li>

              {/* Service Item 4 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Market Insights & Trends
                </p>
                <p className="text-lg text-gray-600">
                  We provide in-depth research on market trends, industry
                  forecasts, and investment opportunities.
                </p>
              </li>

              {/* Service Item 5 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Consulting & Advisory
                </p>
                <p className="text-lg text-gray-600">
                  Our expert advisors offer guidance on refining business
                  strategies, enhancing investor appeal, and improving the
                  likelihood of successful investment deals.
                </p>
              </li>

              {/* Service Item 6 */}
              <li className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  Resource Center & Knowledge Sharing
                </p>
                <p className="text-lg text-gray-600">
                  We offer resources, articles, and tools to help businesses
                  prepare for investor pitches and understand market dynamics.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Testimonial Section */}
      <motion.section
        className="customer-review my-32"
        ref={ref2}
        variants={textVariants2}
        initial="hidden"
        animate={controls}
      >
        <p className=" lg:text-3xl sm:text-xl  xs:text-xl  xxs:text-xl text-center mb-4 text-gray-900 font-bold">
          Success Stories from Our Platform
        </p>
        <p className="text-center lg:text-3xl sm:text-xl  xs:text-xl  xxs:text-xl lg:text-bold  sm:text-bold  xs:text-bold  xxs:text-bold mb-16">
          Hear from businesses like yours that achieved growth with InvestKoree:
        </p>
        <div className="flex flex-col  sm:flex-row  sm:mx-4 xs:mx-4 xxs:mx-4 gap-6 items-center justify-center">
          {/* Sample Testimonial 1 */}
          <div className="bg-white w-full sm:w-[35%] lg:w-[40%] hover:bg-salmon rounded-lg sm:h-56 xs:h-56 xxs:h-56  testimonial-card shadow-md p-6 group">
            <div className="flex items-center testimonial-card-content">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-white">
                  Hasibul Hassan Safran
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-white">
                  Startup Founder
                </p>
              </div>
            </div>
            <div className="mt-4 testimonial-card-content">
              <p className="text-gray-700 group-hover:text-white">
                "InvestKoree helped us secure funding within weeks. The process
                was seamless!This platform is a game-changer for startups."
              </p>
            </div>
          </div>

          {/* Sample Testimonial 2 */}
          <div className="bg-white w-full sm:w-[35%] lg:w-[40%] hover:bg-salmon sm:h-56 xs:h-56 xxs:h-56 rounded-lg  testimonial-card shadow-md p-6 group">
            <div className="flex items-center testimonial-card-content">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-white">
                  Omor Faruk
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-white">
                  Small Business Owner
                </p>
              </div>
            </div>
            <div className="mt-4 testimonial-card-content">
              <p className="text-gray-700 group-hover:text-white">
                "Their platform connected us with investors who understood our
                vision. We've doubled our revenue since!"
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      {/* <div style={{ height: "100vh", padding: "20px" }}>
        <h1>Scroll to see the percentage bar</h1>
        <p>Scroll Percentage: {Math.round(scrollPercentage)}%</p>
      </div> */}
    </div>
  );
};

export default Home;
