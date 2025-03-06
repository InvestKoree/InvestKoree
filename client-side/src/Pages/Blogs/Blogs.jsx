// import { useState } from "react";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.jpg";
import blog6 from "../../assets/blogsix.jpg";
import blog4 from "../../assets/blog4.jpeg";
import blog5 from "../../assets/blog5.jpeg";
import blog7 from "../../assets/blog7.png";
import blog8 from "../../assets/blog8.jpeg";
import blog9 from "../../assets/blognine.jpeg";
import blog10 from "../../assets/blogten.png";
import blog11 from "../../assets/blog11.png";
import blog12 from "../../assets/blog12.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Blogs = () => {
  const { t } = useTranslation();
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
  const handleShowMore4 = () => {
    navigate("/blogfour");
  };
  const handleShowMore5 = () => {
    navigate("/blogfive");
  };
  const handleShowMore6 = () => {
    navigate("/blogsix");
  };
  const handleShowMore7 = () => {
    navigate("/blogseven");
  };
  const handleShowMore8 = () => {
    navigate("/blogeight");
  };
  const handleShowMore9 = () => {
    navigate("/blognine");
  };
  const handleShowMore10 = () => {
    navigate("/blogten");
  };
  const handleShowMore11 = () => {
    navigate("/blog11");
  };
  const handleShowMore12 = () => {
    navigate("/blog12");
  };
  return (
    <div>
      <h1 className="text-center lg:text-4xl sm:text-2xl xxs:text-2xl xs:text-2xl mt-20">
        {t("blog")}
      </h1>
      <div className="flex lg:flex-col sm:flex-col xxs:flex-col xs:flex-col ">
        <div className=" flex items-center justify-center lg:flex-row sm:flex-col xxs:flex-col xs:flex-col ">
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px]  ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
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
                  <h2 className=" font-bold mb-2">{t("blog1_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog1_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore1}
                    className="mt-auto sm:mx-auto xxs:mx-auto  xs:mx-auto bg-salmon h-12 w-28 text-white py-2 px-2  rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
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
                  <h2 className=" font-bold mb-2">{t("blog2_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog2_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore3}
                    className=" mt-auto sm:mx-auto xxs:mx-auto bg-salmon  text-white h-12 w-28 px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
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
                  <h2 className=" font-bold mb-2">{t("blog3_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog3_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore2}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-col xxs:flex-col xs:flex-col">
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
              {/* Image and Text Container */}
              <div className="flex flex-col md:flex-row h-full p-4">
                {/* Image */}
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img
                    src={blog4}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                {/* Text */}
                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog4_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog4_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore4}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
              {/* Image and Text Container */}
              <div className="flex flex-col md:flex-row h-full p-4">
                {/* Image */}
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img
                    src={blog5}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                {/* Text */}
                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog5_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog5_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore5}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
              {/* Image and Text Container */}
              <div className="flex flex-col md:flex-row h-full p-4">
                {/* Image */}
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img
                    src={blog6}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                {/* Text */}
                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog6_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog6_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore6}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-col xxs:flex-col xs:flex-col">
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg bg-white">
              {/* Image and Text Container */}
              <div className="flex flex-col md:flex-row h-full p-4">
                {/* Image */}
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img
                    src={blog7}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                {/* Text */}
                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog7_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog7_description")}
                  </p>

                  {/* Button */}
                  <button
                    onClick={handleShowMore7}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full p-4 bg-white">
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img
                    src={blog8}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>

                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog8_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog8_description")}
                  </p>

                  <button
                    onClick={handleShowMore8}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full p-4 bg-white">
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img src={blog9} className=" w-full h-full rounded-md" />
                </div>

                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog9_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog9_description")}
                  </p>

                  <button
                    onClick={handleShowMore9}
                    className="mt-auto sm:mx-auto xxs:mx-auto  bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-col xxs:flex-col xs:flex-col">
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full p-4 bg-white">
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img src={blog10} className=" w-full h-full rounded-md" />
                </div>

                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">{t("blog10_title")}</h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {t("blog10_description")}
                  </p>

                  <button
                    onClick={handleShowMore10}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full p-4 bg-white">
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img src={blog11} className=" w-full h-full rounded-md" />
                </div>

                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">
                    বাংলােদেশ স্টাটআপ কালচার:কীভাবে সফল উেদ্যাক্তা হওয়া যায়?
                  </h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    বাংলােদেশর স্টাটআপ ইেকািসেস্টম দিন দিন শিক্তশালী হে ।
                    প্রযিক্ত, ই-কমাস, িফনেটক এবং এডেটেকর মেতা িবিভন্ন খােত নতন
                    উেদ্যাক্তারা দারুণভােব সফল হে ন। িকন্তু একজন সফল উেদ্যাক্তা
                    হেত হেল শুধমাত্র একটি আইিডয়া থাকেলই হয় না, এর জন্য দরকার
                    সঠিক পিরকল্পনা, স্ট্র্যােটিজ এবং পিরশ্রম। আজেকর এই ব্লেগ
                    আমরা জানেবা িকভােব বাংলােদেশ একজন সফল উেদ্যাক্তা হওয়া সম্ভব
                    এবং কীভােব আপনার স্টাটআপেক সফলভােব পিরচালনা করেবন।
                  </p>

                  <button
                    onClick={handleShowMore11}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-4 lg:h-[400px] ">
            <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full p-4 bg-white">
                <div className="lg:w-full md:w-1/2 h-64 md:h-auto sm:w-[full] xxs:w-[full] xs:w-[full]  sm:mb-2 xxs:mb-2 xs:mb-2 sm:h-[30%] xxs:h-[30%] xs:h-[30%]">
                  <img src={blog12} className=" w-full h-full rounded-md" />
                </div>

                <div className="lg:p-4 flex flex-col justify-between w-full md:w-1/2 ">
                  <h2 className=" font-bold mb-2">
                    বিনিয়োগকারীদের সাথে সফল সংযোগের জন্য ৫টি টিপস
                  </h2>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    আপনার ব্যবসার জন্য সঠিক বিনিয়োগকারী খুঁজে পেতে সঠিক
                    পদক্ষেপগুলি গ্রহণ করা খুবই গুরুত্বপূর্ণ। InvestKoree আপনাকে
                    সঠিক দিকনির্দেশনা দেবে, যাতে আপনি সফলভাবে বিনিযোগকারীদের
                    সাথে সংযোগ করতে পারেন।
                  </p>

                  <button
                    onClick={handleShowMore12}
                    className="mt-auto sm:mx-auto xxs:mx-auto bg-salmon h-12 w-28 text-white px-2 py-2 rounded hover:bg-blue-600"
                  >
                    {t("show_more")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
