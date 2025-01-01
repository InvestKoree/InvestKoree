// import { useState } from "react";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  // Track which post is expanded
  const navigate = useNavigate();

  const handleShowMore1 = () => {
    navigate("/blogone");
  };
  const handleShowMore2 = () => {
    navigate("/blogtwo");
  };
  const handleShowMore3 = () => {
    navigate("/blogthree");
  };
  return (
    <div>
      <h1 className="text-center lg:text-4xl sm:text-2xl xxs:text-2xl xs:text-2xl mt-20">
        Blog
      </h1>
      <div className="lg:h-[600px] flex items-center justify-center lg:flex-row sm:flex-col xxs:flex-col xs:flex-col">
        <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
          <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
            {/* Image and Text Container */}
            <div className="flex flex-col md:flex-row h-full p-4">
              {/* Image */}
              <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full] sm:mb-2 xxs:mb-2 xs:mb-2  sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                <img
                  src={blog1}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              {/* Text */}
              <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2">
                <h2 className="text-lg font-bold mb-2">
                  How to Find the Right Investor for Your Business
                </h2>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  Securing the right investment can be a game-changer for your
                  business. But with so many potential investors out there, how
                  do you choose the one who truly aligns with your goals? At
                  InvestKoree, we understand that finding the right investor is
                  not just about getting money—it’s about finding a partner who
                  believes in your vision and can help take your business to the
                  next level. Why the Right Investor Matters When seeking
                  investors, it’s easy to focus on the amount of money they can
                  provide. However, the right investor offers much more than
                  just capital. They bring expertise, resources, and connections
                  that can accelerate your growth. A good investor will be
                  passionate about your business and share your long-term
                  vision, supporting you through challenges and celebrating
                  milestones along the way.
                </p>

                {/* Button */}
                <button
                  onClick={handleShowMore1}
                  className="mt-auto bg-salmon text-white py-2 px-2 h-10 rounded hover:bg-blue-600"
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
          <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
            {/* Image and Text Container */}
            <div className="flex flex-col md:flex-row h-full p-4">
              {/* Image */}
              <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                <img
                  src={blog2}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              {/* Text */}
              <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2">
                <h2 className="text-lg font-bold mb-2">
                  Top 5 Industries to Invest in 2024: A Guide for Aspiring
                  Entrepreneurs and Investors
                </h2>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  The global business landscape is constantly evolving, and 2024
                  is no exception. For entrepreneurs looking to attract
                  investors and for investors seeking high-growth opportunities,
                  knowing where to focus is key. At Invest Koree, we specialize
                  in connecting ambitious businesses with the right investors.
                  Here’s our guide to the top five industries poised for growth
                  in 2024
                </p>

                {/* Button */}
                <button
                  onClick={handleShowMore3}
                  className="mt-auto bg-salmon text-white px-2 py-2 rounded hover:bg-blue-600"
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
          <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
            {/* Image and Text Container */}
            <div className="flex flex-col md:flex-row h-full p-4">
              {/* Image */}
              <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                <img
                  src={blog3}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              {/* Text */}
              <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                <h2 className="text-lg font-bold mb-2">
                  Why Invest Locally: Unlock Opportunities for Bangladeshi
                  Investors and Business Owners
                </h2>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  In recent years, Bangladesh has witnessed significant economic
                  growth, opening up numerous opportunities for local investors
                  and business owners. As the nation moves towards becoming a
                  middle-income country, the time has never been better to
                  invest in homegrown industries and support the local economy
                </p>

                {/* Button */}
                <button
                  onClick={handleShowMore2}
                  className="mt-auto bg-salmon text-white px-2 py-2 rounded hover:bg-blue-600"
                >
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
