import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingBar from "../UI/LoadingBar";
import { Navigate } from "react-router-dom";
const GuestRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, user } = useAuthContext();

  if (isLoading) {
    return (
      <>
        <LoadingBar />
        {children}
      </>
    );
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default GuestRoute;
