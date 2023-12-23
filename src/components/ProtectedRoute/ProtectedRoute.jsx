import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (authContext.isLoggedIn) {
    return children;
  } else {
    navigate("/login");
  }
};

export default ProtectedRoute;
