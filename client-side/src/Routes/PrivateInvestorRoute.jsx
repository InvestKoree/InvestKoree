import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const PrivateInvestorRoute = ({ children }) => {
  const { userdata, loading } = useAuth();
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!userdata || userdata.role !== "investor") {
    return <Navigate to="/investorlogin" />; // Redirect to login if not authenticated as investor
  }

  return children; // Render the protected route for investors
};

export default PrivateInvestorRoute;
