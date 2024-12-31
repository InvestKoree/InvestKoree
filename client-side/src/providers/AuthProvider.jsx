import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userdata, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const navigate = useNavigate();

  const selectPost = (post) => {
    setSelectedPost(post);
  };

  const clearSelectedPost = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/profile`, {
          credentials: "include", // Include cookies in the request
          headers: {
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
        setLoading(false);
      }
    };

    fetchUser();
  }, [API_URL]);

  const logOut = async () => {
    // Call your logout endpoint to clear the cookie on the server
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
      setUser(null);
      setUserData(null);
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const createUser = async (name, email, password, role, phone) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password, role, phone }),
      });

      const result = await response.json();
      if (response.ok) {
        const userData = { email, role };
        setUser(userData);
        toast.success("Registration successful: You can Sign in now");
      } else {
        throw new Error(
          "Registration failed: Email or phone number already in use"
        );
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const foundersignIn = async (email, password, phone) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
        credentials: "include", // Include cookies in the request
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "founder") {
          const errorMessage = `Access denied: Only ${role}s can log in here.`;
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        const userData = { email, userId, phone, role };
        setUser(userData);
        navigate("/founderdashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in as founder:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const investorsignIn = async (email, password, phone) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
        credentials: "include", // Include cookies in the request
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "investor") {
          const errorMessage = `Access denied: Only ${role}s can log in here.`;
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        const userData = { email, userId, phone, role };
        setUser(userData);
        navigate("/investordashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in as investor:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const adminsignIn = async (email, password, phone) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, phone }),
        credentials: "include", // Include cookies in the request
      });

      const result = await response.json();
      if (response.ok) {
        const { userId, role } = result;

        if (role !== "admin") {
          const errorMessage = `Access denied: Only ${role}s can log in here.`;
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        const userData = { email, userId, phone, role };
        setUser(userData);
        navigate("/admindashboard");
        toast.success("Login successful");
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error signing in as admin:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    logOut,
    createUser,
    foundersignIn,
    investorsignIn,
    adminsignIn,
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
