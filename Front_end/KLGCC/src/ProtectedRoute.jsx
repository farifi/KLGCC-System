import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust path if needed

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // safe

  if (!user) {
    return <Navigate to="/LandingPage" replace />;
  }

  return children;
};

export default ProtectedRoute;