// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const loggedIn = isAuthenticated();
  const role = getUserRole();

  // Not logged in → redirect to login
  if (!loggedIn) return <Navigate to="/login" replace />;

  // Logged in but role not allowed → redirect to login
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // All good → render the protected content
  return children;
};

export default ProtectedRoute;
