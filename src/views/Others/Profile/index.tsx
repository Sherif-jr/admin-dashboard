import { Avatar, Box, Card, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import {
  editAdmin,
  getAdmin,
} from "../../../util/query/httpFunctions/adminHttpFunctions";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Admin } from "../../../interfaces/Admin.interface";
import queryClient from "../../../util/query/queryClient";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const Profile = () => {
  const { user } = useAuthContext();
  const { data, isPending } = useQuery<Admin>({
    queryKey: ["admins", "current"],
    queryFn: () => {
      return getAdmin(user._id);
    },
    initialData: { email: "", name: "" },
  });
  const { mutate, isPending: isMutPending } = useMutation({
    mutationFn: ({ user }: { user: Admin }) => {
      return editAdmin(user);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admins", "current"] });
    },
    onSuccess: () => {
      toast.success("Edited Successfully!");
    },
    onError: () => {
      toast.error("Error. Task failed.");
    },
  });
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
              mutate({ user: { _id: user._id, ...values } });
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
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    placeholder="Email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isMutPending || isPending}
                  >
                    Save
                  </LoadingButton>
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
