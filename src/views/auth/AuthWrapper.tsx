import { styled } from "@mui/material/styles";

const AuthWrapper = styled("div")(() => {
  return {
    backgroundColor: "#eef2f6",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

export default AuthWrapper;
