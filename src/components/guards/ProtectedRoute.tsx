import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingBar from "../UI/LoadingBar";
import { Navigate } from "react-router-dom";
const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, token } = useAuthContext();

  if (isLoading) {
    return <LoadingBar />;
  }
  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default ProtectedRoute;
