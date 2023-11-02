import "./App.css";
import { RouterProvider } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";

import { router } from "./routes";
import AuthContextProvider from "./context/AuthContext";
// import theme from "./themes";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <AuthContextProvider>
        <ThemeProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </SidebarProvider>
  );
}

export default App;
