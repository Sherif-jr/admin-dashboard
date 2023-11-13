import "./App.css";
//router
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
//auth &sidebar
import AuthContextProvider from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";
//theme
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
//query client
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./util/query/queryClient";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <CssBaseline />
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer />
          </QueryClientProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </SidebarProvider>
  );
}

export default App;
