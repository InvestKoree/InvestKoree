import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const PrivateAdminRoute = ({ children }) => {
  const { userdata, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!userdata || userdata.role !== "admin") {
    return <Navigate to="/adminlogin" />; // Redirect to login if not authenticated as admin
  }

  return children; // Render the protected route for admins
};

export default PrivateAdminRoute;
