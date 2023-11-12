import { Avatar, Box, Card, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { getAdmin } from "../../../util/query/httpFunctions/adminHttpFunctions";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Admin } from "../../../interfaces/Admin.interface";

const Profile = () => {
  const { user } = useAuthContext();
  const { data } = useQuery<Admin>({
    queryKey: ["admins", "current"],
    queryFn: () => {
      return getAdmin(user._id);
    },
    initialData: { email: "", name: "" },
  });
  console.log(data);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={2}
        position="relative"
      >
        <Avatar
          alt="M"
          sx={{ width: 200, height: 200, opacity: 1, bgcolor: "grey" }}
        />
      </Box>
      <Card
        sx={{
          position: "relative",
          top: -100,
          zIndex: 1,
          p: 3,
          height: 400,
          bgcolor: "white",
        }}
      >
        <Box mt="100px" mx="auto" width={300}>
          <Formik
            enableReinitialize
            initialValues={{ email: data.email, name: data.name }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <Stack direction="column" gap={2} width="100%">
                  <Typography variant="h3" align="center">
                    Hello There!
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Card>
    </>
  );
};

export default Profile;
