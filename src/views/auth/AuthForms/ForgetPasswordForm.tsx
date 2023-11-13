import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const ForgetPasswordForm = () => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email()
          .required("Email is required to login.")
          .label("Email"),
      })}
      onSubmit={async (values) => {
        console.log(values);
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
          <TextField
            fullWidth
            type="text"
            name="email"
            placeholder="Email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(touched.email && errors.email) || " "}
            error={Boolean(touched.email && errors.email)}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 1 }}
          >
            Reset Password
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;
