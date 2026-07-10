import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap any <Route element={...}> that should only be reachable while
// logged in (e.g. the product-management page). Once the Spring Boot
// backend exposes roles on the user object, this is also the place to
// add a role check (e.g. user.role === "ADMIN").
const RequireAuth = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
