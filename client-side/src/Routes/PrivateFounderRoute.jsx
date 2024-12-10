import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const PrivateFounderRoute = ({ children }) => {
  const { userdata, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!userdata || userdata.role !== "founder") {
    return <Navigate to="/founderlogin" />; // Redirect to login if not authenticated as founder
  }

  return children; // Render the protected route for founders
};

export default PrivateFounderRoute;
