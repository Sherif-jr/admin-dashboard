import Box from "@mui/material/Box";
import AuthWrapper from "./AuthWrapper";
import LoginForm from "./AuthForms/LoginForm";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Card, Typography } from "@mui/material";
const Login = () => {
  return (
    <AuthWrapper>
      <Card
        sx={{
          maxWidth: { xs: 400, lg: 475 },
          margin: { xs: 2.5, md: 3 },
          "& > *": {
            flexGrow: 1,
            flexBasis: "50%",
          },
        }}
      >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
          <Box sx={{ width: "100%", mb: 3 }}>
            <img
              src={Logo}
              alt="logo"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Box>
          <LoginForm />
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography
              component={Link}
              to="/auth/forgot-password"
              variant="subtitle1"
              color="secondary"
              sx={{
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Box>
      </Card>
    </AuthWrapper>
  );
};

export default Login;
