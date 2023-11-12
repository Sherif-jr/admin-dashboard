import { FC } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProtectedRoute from "../../guards/ProtectedRoute";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
// import Chat from "../../UI/Chat";

interface SidebarLayoutProps {
  guard?: boolean;
}

const MainLayout: FC = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",

          ".MuiPageTitle-wrapper": {
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up("lg")]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box display="block" p={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      {/* ========= Chat Box ============ */}
      {/* <Box
        sx={{
          position: "absolute",
          bottom: "80px",
          right: "30px",
          zIndex: 6,
        }}
      >
        <Chat />
      </Box> */}
      <Box sx={{ position: "fixed", zIndex: 5, bottom: "12px", right: "30px" }}>
        <Fab
          sx={{
            bgcolor: theme.colors.primary.dark,
            "&:hover": {
              bgcolor: theme.colors.primary.main,
            },
          }}
        >
          <ChatIcon
            sx={{
              fill: "white",
            }}
          />
        </Fab>
      </Box>
    </>
  );
};

const SidebarLayout: FC<SidebarLayoutProps> = ({ guard }) => {
  if (guard) {
    return (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    );
  } else {
    return <MainLayout />;
  }
};
export default SidebarLayout;
