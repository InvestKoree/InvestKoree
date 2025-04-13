import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userdata, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const selectPost = (post) => {
    setSelectedPost(post); // Set the selected post
  };

  const clearSelectedPost = () => {
    setSelectedPost(null); // Clear the selected post
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      setLoading(true); // Set loading to true when fetching starts

      try {
        const response = await fetch(`${API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        setUser(userData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchUser();
  }, [token, API_URL]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
  };

  const createUser = async (name, email, password, role, phone, profilePic) => {
    setLoading(true); // Set loading to true when registration starts
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          phone,
          profilePic,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result?.message || "Registration failed"; // Check for result.message
        throw new Error(errorMessage); // Throw the error if response is not OK
      }
      console.log({ name, email, password, role, phone, profilePic });

      const userData = { email, phone, role };
      setUser(userData);
      localStorage.setItem("token", result.token); // Store the token in localStorage
      setToken(result.token); // Set the token in state
    } catch (error) {
      if (
        error.message.includes("duplicate key error") &&
        (error.message.includes("email") || error.message.includes("phone"))
      ) {
        toast.error("Email or phone number already used");
      } else {
        console.error("Error creating user:", error);
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false); // Ensure loading is turned off
    }
  };

  const foundersignIn = async (email, password, phone) => {
    setLoading(true); // Set loading to true when sign-in starts
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "founder") {
          const errorMessage = `Access denied: Only founders can log in here.`;
          toast.error(errorMessage); // Show the toast with the error message
          throw new Error(errorMessage); // Throw an error to stop further execution
        }

        const userData = { email, userId, phone, role, profilePic };
        setUser(userData);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        navigate("/founderdashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false); // Set loading to false when sign-in completes
    }
  };

  const investorsignIn = async (email, password, phone) => {
    setLoading(true); // Set loading to true when sign-in starts
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "investor") {
          const errorMessage = `Access denied: Only investors can log in here.`;
          toast.error(errorMessage); // Show the toast with the error message
          throw new Error(errorMessage); // Throw an error to stop further execution
        }

        const userData = { email, userId, phone, role, profilePic };
        setUser(userData);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        navigate("/investordashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false); // Set loading to false when sign-in completes
    }
  };

  const adminsignIn = async (email, password, phone) => {
    setLoading(true); // Set loading to true when sign-in starts
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "admin") {
          const errorMessage = `Access denied: Only admins can log in here.`;
          toast.error(errorMessage); // Show the toast with the error message
          throw new Error(errorMessage); // Throw an error to stop further execution
        }

        const userData = { email, userId, phone, role };
        setUser(userData);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        navigate("/admindashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false); // Set loading to false when sign-in completes
    }
  };

  const authInfo = {
    user,
    token,
    logOut,
    createUser,
    foundersignIn,
    adminsignIn,
    investorsignIn,
    userdata,
    loading,
    selectedPost,
    selectPost,
    clearSelectedPost,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
