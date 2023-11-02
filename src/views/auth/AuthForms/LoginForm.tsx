import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email()
          .required("Email is required to login.")
          .label("Email"),
        password: Yup.string()
          .min(8, "Password must be 8 characters long")
          .matches(/[0-9]/, "Password requires a number")
          .matches(/[a-z]/, "Password requires a lowercase letter")
          .matches(/[A-Z]/, "Password requires an uppercase letter")
          .matches(/[^\w]/, "Password requires a symbol")
          .required("Please enter your password.")
          .label("Password"),
      })}
      onSubmit={async (values) => {
        console.log(values);
        login({ _id: "wqerrytui", email: values.email, role: "not important" });
        navigate("/");
      }}
    >
      {({
        // dirty,
        // isSubmitting,
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <Stack gap={1.2} direction="column" mb={1}>
            <TextField
              fullWidth
              type="text"
              name="email"
              placeholder="Email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.email && errors.email) || " "}
              error={Boolean(touched.email && errors.email)}
            />
            <TextField
              fullWidth
              type="text"
              name="password"
              placeholder="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={(touched.password && errors.password) || " "}
              error={Boolean(touched.password && errors.password)}
            />
          </Stack>
          <Button variant="contained" type="submit" fullWidth size="large">
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
