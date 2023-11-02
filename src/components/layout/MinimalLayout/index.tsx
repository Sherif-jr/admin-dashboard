import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MinimalLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "95vh",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default MinimalLayout;
