import { useState, useEffect, useRef } from "react";
import logo from "../assets/ll.png";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useAuth } from "../providers/AuthProvider";
import Notifications from "./Notifications";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const { userdata, logOut } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const handleSignOut = () => {
    logOut();
    toast.success("Signed Out Successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoadingResults(true);
      try {
        const response = await axios.get(
          `${API_URL}/searchpost/search?businessName=${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        toast.error("Error fetching search results");
      } finally {
        setLoadingResults(false);
      }
    } else {
      toast.error("Please enter a search term.");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="navbar px-6 py-3 flex justify-between items-center">
        <div className="flex items-center navbar-start">
          <Link to="/">
            <img className="h-16 w-36 logo-css" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="lg:hidden block">
          <button onClick={toggleMenu} className="text-xl">
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        <div className="flex relative gap-2 navbar-center">
          <form onSubmit={handleSearch} className="flex items-center mx-4">
            <input
              type="text"
              placeholder="Search By Business Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-salmon rounded-l-md p-2 lg:w-64"
            />
            <button
              type="submit"
              className="bg-salmon text-white rounded-r-md p-2"
            >
              <AiOutlineSearch />
            </button>
          </form>
          {searchResults.length > 0 && (
            <div className="absolute bg-white border border-salmon rounded-md shadow-lg mt-2 w-64 z-10">
              {loadingResults ? (
                <div>Loading...</div>
              ) : (
                searchResults.map((result) => (
                  <NavLink
                    key={result._id}
                    to={`/projectdetail/${result._id}`}
                    className="block p-2 hover:bg-salmon hover:text-white"
                    onClick={() => setSearchResults([])}
                  >
                    {result.businessName}
                  </NavLink>
                ))
              )}
            </div>
          )}
        </div>
        <div
          className={`hidden lg:flex flex-1 justify-center items-center navbar-end`}
        >
          <ul
            ref={dropdownRef}
            className="menu menu-horizontal gap-8 px-1 flex"
          >
            <li>
              <NavLink
                to="/founderlogin"
                className="hover:bg-salmon p-2 rounded"
              >
                Get Funded
              </NavLink>
            </li>
            <li>
              <details open={activeDropdown === "category"}>
                <summary
                  onClick={() => toggleDropdown("category")}
                  className="hover:bg-salmon p-2 rounded"
                >
                  Category
                </summary>
                {activeDropdown === "category" && (
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <NavLink
                        to="/shariah"
                        className="hover:bg-salmon p-2 rounded"
                      >
                        Shariah
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/stocks"
                        className="hover:bg-salmon p-2 rounded"
                      >
                        Stocks
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/fixedreturn"
                        className="hover:bg-salmon p-2 rounded"
                      >
                        Fixed Return
                      </NavLink>
                    </li>
                  </ul>
                )}
              </details>
            </li>
            <li>
              {userdata ? (
                <div className="flex items-center">
                  <Link
                    to={`/${userdata.role}dashboard`}
                    className="hover:bg-salmon p-2 rounded"
                  >
                    MyProfile
                  </Link>
                  <div
                    onClick={handleSignOut}
                    className="hover:bg-salmon p-2 rounded cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <NavLink to="/login" className="hover:bg-salmon p-2 rounded">
                  Login
                </NavLink>
              )}
            </li>
            <li>
              {userdata && (
                <Notifications API_URL={API_URL} userId={userdata._id} />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
