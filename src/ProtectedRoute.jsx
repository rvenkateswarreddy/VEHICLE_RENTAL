import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, type }) => {
  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  if (type === "user" && !userToken) {
    return <Navigate to="/login" />;
  }

  if (type === "admin" && !adminToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
