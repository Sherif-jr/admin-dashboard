import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GuestRoute from "../../guards/GuestRoute";

interface MinLayoutProps {
  guard?: boolean;
}
const Layout = () => {
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

const MinimalLayout: React.FC<React.PropsWithChildren<MinLayoutProps>> = ({
  guard,
}) => {
  if (guard) {
    return (
      <GuestRoute>
        <Layout />
      </GuestRoute>
    );
  } else {
    return <Layout />;
  }
};

export default MinimalLayout;
