import { useState, useEffect, useRef } from "react";
import logo from "../assets/ll.png";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineGlobal,
} from "react-icons/ai";
import { useAuth } from "../providers/AuthProvider";
import Notifications from "./Notifications";
import { useTranslation } from "react-i18next";
import bd from "../assets/bd.png";
import usa from "../assets/usa.png";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const { userdata, logOut } = useAuth();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const searchBarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSignOut = () => {
    logOut();
    toast.success("Signed Out Successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const toggleMobileDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const toggleDropdown = (dropdownName) => {
    setTimeout(() => {
      setActiveDropdown((prev) =>
        prev === dropdownName ? null : dropdownName
      );
    }, 250);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setShowLanguageDropdown(false);
      }
    };

    const handleOutsideSearchClick = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideSearchClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideSearchClick);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?businessName=${encodeURIComponent(searchTerm)}`);
      setShowSearchBar(false);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="navbar px-6 py-3 flex justify-between items-center">
        <div className="flex items-center navbar-start">
          <Link to="/">
            <img className="h-16 logo-css" src={logo} alt="logo" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden block">
          <button
            onClick={toggleMenu}
            className="sm:text-base xs:text-base xxs:text-base sm:font-medium xs:font-medium xxs:font-medium lg:text-2xl"
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Search Bar for Large Screens */}
        <div className="lg:flex hidden lg:mr-60 relative gap-2 rounded-md">
          {showSearchBar ? (
            <form
              onSubmit={handleSearch}
              className="flex items-center mx-4"
              ref={searchBarRef}
            >
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-salmon rounded-l-md p-2 lg:h-[50px] lg:max-w-[300px] md:w-[400px] sm:w-48 xs:w-32 xxs:w-24"
              />
              <button
                type="submit"
                className="bg-salmon text-white rounded-r-md p-2 absolute right-6"
              >
                <AiOutlineSearch />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearchBar(true)}
              className="bg-salmon text-white rounded-md p-2"
            >
              <AiOutlineSearch />
            </button>
          )}
        </div>

        {/* Full Navbar for Larger Screens */}
        <div className="hidden whitespace-nowrap lg:flex lg:flex-row flex-1 justify-center items-center navbar-end">
          <ul
            ref={dropdownRef}
            className="lg:font-bold whitespace-nowrap lg:text-lg sm:text-sm xs:text-sm xxs:text-sm sm:font-medium xs:font-medium xxs:font-medium menu menu-horizontal gap-6 px-1 flex-nowrap lg:w-[800px] lg:h-20 lg:justify-end"
          >
            <li>
              <NavLink
                to="/founderlogin"
                className="hover:bg-salmon transition mt-2 hover:text-white p-2 rounded"
                activeclassname="active"
              >
                {t("get_funded")}
              </NavLink>
            </li>
            <li>
              <details
                open={activeDropdown === "category"}
                onClick={(e) => e.preventDefault()}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("category");
                  }}
                  className="hover:bg-salmon mt-2 p-2 rounded hover:text-white"
                >
                  {t("category")}
                </summary>
                {activeDropdown === "category" && (
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <NavLink
                        to="/shariah"
                        className="hover:bg-salmon transition sm:mb-2 xs:mb-2 xxs:mb-2 hover:text-white p-2 rounded"
                        activeclassname="active"
                      >
                        {t("shariah")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/stocks"
                        className="hover:bg-salmon transition sm:mb-2 xs:mb-2 xxs:mb-2 hover:text-white p-2 rounded"
                        activeclassname="active"
                      >
                        {t("stocks")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/fixedreturn"
                        className="hover:bg-salmon transition hover:text-white p-2 rounded"
                        activeclassname="active"
                      >
                        {t("fixed_return")}
                      </NavLink>
                    </li>
                  </ul>
                )}
              </details>
            </li>
            <li>
              <NavLink
                to="/blogs"
                className="hover:bg-salmon transition mt-2 hover:text-white p-2 rounded"
                activeclassname="active"
              >
                {t("blog")}
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="hover:bg-salmon hover:text-white transition mt-2 rounded"
              >
                <AiOutlineGlobal />
                {i18n.language === "en" ? "EN" : "BN"}
              </button>
              {showLanguageDropdown && (
                <ul className="absolute top-16 bg-white right-[1px] w-[90px] rounded mt-2">
                  <li className="hover:bg-salmon hover:text-white rounded mr-1">
                    <div>
                      <div>
                        <img src={usa} alt="USA Flag" className="" />
                      </div>
                      <div>
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className="text-sm"
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="hover:bg-salmon hover:text-white rounded mr-1 mb-2">
                    <div>
                      <div>
                        <img src={bd} alt="Bangladesh Flag" />
                      </div>
                      <div>
                        <button
                          onClick={() => handleLanguageChange("bn")}
                          className=" text-sm "
                        >
                          BN
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              {userdata ? (
                <div className="flex items-center logout-container">
                  {userdata.role === "investor" && (
                    <Link
                      to="/investordashboard"
                      className="hover:bg-salmon transition hover:text-white p-2 rounded"
                    >
                      {t("my_profile")}
                    </Link>
                  )}
                  {userdata.role === "founder" && (
                    <Link
                      to="/founderdashboard"
                      className="hover:bg-salmon transition hover:text-white p-2 rounded"
                    >
                      {t("my_profile")}
                    </Link>
                  )}
                  {userdata.role === "admin" && (
                    <NavLink
                      to="/admindashboard"
                      onClick={toggleMenu}
                      className="hover:bg-salmon hover:text-white transition p-2 rounded"
                    >
                      {t("my_profile")}
                    </NavLink>
                  )}
                  <div
                    onClick={handleSignOut}
                    className="hover:bg-salmon transition lg:ml-8 hover:text-white p-2 rounded cursor-pointer"
                  >
                    {t("logout")}
                  </div>
                </div>
              ) : (
                <details open={activeDropdown === "login"}>
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("login");
                    }}
                    className="hover:bg-salmon mt-2 p-2 rounded hover:text-white"
                  >
                    {t("login")}
                  </summary>
                  {activeDropdown === "login" && (
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li>
                        <NavLink
                          to="/investorlogin"
                          className="hover:bg-salmon transition hover:text-white p-2 lg:mb-2 sm:mb-2 xs:mb-2 xxs:mb-2 rounded"
                          activeclassname="active"
                        >
                          {t("investor_login")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/founderlogin"
                          className="hover:bg-salmon transition hover:text-white p-2 rounded"
                          activeclassname="active"
                        >
                          {t("founder_login")}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </details>
              )}
            </li>
            <li>
              {userdata && (
                <Notifications API_URL={API_URL} userId={userdata._id} />
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex flex-col items-start p-4 bg-white shadow-lg">
            <ul
              ref={dropdownRef}
              className="flex sm:flex-col xs:flex-col xxs:flex-col sm:text-sm xs:text-sm xxs:text-sm sm:font-medium xs:font-medium xxs:font-medium lg:text-lg sm:gap-2 xs:gap-2 xxs:gap-2"
            >
              <li>
                <NavLink
                  to="/founderlogin"
                  onClick={toggleMenu}
                  className="hover:bg-salmon transition p-2 rounded"
                >
                  {t("get_funded")}
                </NavLink>
              </li>

              <li>
                <details
                  open={activeDropdown === "category"}
                  onClick={(e) => e.preventDefault()}
                >
                  <summary
                    onClick={() => toggleMobileDropdown("category")}
                    className="hover:bg-salmon hover:text-white transition p-2 rounded cursor-pointer"
                  >
                    {t("category")}
                  </summary>
                  {activeDropdown === "category" && (
                    <ul className="bg-base-100 sm:p-2 xs:p-2 xxs:p-2 flex flex-col gap-2">
                      <li>
                        <NavLink
                          to="/shariah"
                          onClick={toggleMenu}
                          className="hover:bg-salmon transition sm:p-2 xs:p-2 xxs:p-2 rounded"
                        >
                          {t("shariah")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/stocks"
                          onClick={toggleMenu}
                          className="hover:bg-salmon transition p-2 rounded"
                        >
                          {t("stocks")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/fixedreturn"
                          onClick={toggleMenu}
                          className="hover:bg-salmon transition p-2 rounded"
                        >
                          {t("fixed_return")}
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </details>
              </li>

              <li>
                <NavLink
                  to="/blogs"
                  onClick={toggleMenu}
                  className="hover:bg-salmon transition mt-2 hover:text-white p-2 rounded"
                  activeclassname="active"
                >
                  {t("blog")}
                </NavLink>
              </li>
              <li>
                <button
                  onClick={toggleLanguageDropdown}
                  className="hover:bg-salmon hover:text-white transition p-2 rounded flex flex-row items-center"
                >
                  <AiOutlineGlobal />
                  {i18n.language === "en" ? "EN" : "BN"}
                </button>
                {showLanguageDropdown && (
                  <ul className=" bg-white right-[1px] flex gap-2 p-2 rounded mt-2">
                    <li className=" rounded ">
                      <div className="flex flex-row gap-1">
                        <div>
                          <img src={usa} alt="USA Flag" className="w-4 h-4" />
                        </div>
                        <div>
                          <button
                            onClick={() => handleLanguageChange("en")}
                            className="text-sm"
                          >
                            EN
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className=" rounded ">
                      <div className="flex flex-row gap-1">
                        <div>
                          <img
                            src={bd}
                            alt="Bangladesh Flag"
                            className="w-4 h-4"
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => handleLanguageChange("bn")}
                            className=" text-sm "
                          >
                            BN
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                {userdata ? (
                  <div className="flex flex-col">
                    {userdata.role === "investor" && (
                      <Link
                        to="/investordashboard"
                        onClick={toggleMenu}
                        className="hover:bg-salmon transition hover:text-white p-2 rounded"
                      >
                        {t("my_profile")}
                      </Link>
                    )}
                    {userdata.role === "founder" && (
                      <Link
                        to="/founderdashboard"
                        onClick={toggleMenu}
                        className="hover:bg-salmon transition hover:text-white p-2 rounded"
                      >
                        {t("my_profile")}
                      </Link>
                    )}
                    {userdata.role === "admin" && (
                      <NavLink
                        to="/admindashboard"
                        onClick={toggleMenu}
                        className="hover:bg-salmon hover:text-white transition p-2 rounded"
                      >
                        {t("my_profile")}
                      </NavLink>
                    )}
                    <div
                      onClick={handleSignOut}
                      className="hover:bg-salmon transition hover:text-white p-2 rounded cursor-pointer"
                    >
                      {t("logout")}
                    </div>
                  </div>
                ) : (
                  <details open={activeDropdown === "login"}>
                    <summary
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("login");
                      }}
                      className="hover:bg-salmon  p-2 rounded hover:text-white"
                    >
                      {t("login")}
                    </summary>
                    {activeDropdown === "login" && (
                      <ul className="bg-base-100 rounded-t-none  flex flex-col gap-2 p-2">
                        <li>
                          <NavLink
                            to="/investorlogin"
                            onClick={toggleMenu}
                            className="hover:bg-salmon transition hover:text-white p-2 lg:mb-2 sm:mb-4 xs:mb-4 xxs:mb-4 rounded"
                            activeclassname="active"
                          >
                            {t("investor_login")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/founderlogin"
                            onClick={toggleMenu}
                            className="hover:bg-salmon transition hover:text-white p-2 rounded"
                            activeclassname="active"
                          >
                            {t("founder_login")}
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </details>
                )}
              </li>
              <li>
                {userdata && (
                  <Notifications
                    className="h-5 w-5"
                    API_URL={API_URL}
                    userId={userdata._id}
                  />
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
