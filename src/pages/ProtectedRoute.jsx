import PropTypes from "prop-types";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
