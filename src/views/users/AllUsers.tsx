import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "../../interfaces/User.interface";
import {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
} from "../../util/query/httpFunctions/userHttpFunctions";
import UsersTable from "./UsersTable/UserTable";
import queryClient from "../../util/query/queryClient";
import { useEffect, useState } from "react";
import generatePassword from "../../util/passwordGenetator";
import { ContentCopy } from "@mui/icons-material";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ModalState {
  show: boolean;
  action: "add" | "delete" | "error";
  newPassword?: string;
  toDeleteId?: string;
  message?: string;
}
const initialModal: ModalState = {
  show: false,
  action: "delete",
  newPassword: "",
  toDeleteId: "",
  message: "",
};

const AllUsers = () => {
  const [modal, setModal] = useState<ModalState>(initialModal);
  const { data, isRefetching, isLoading } = useQuery<User[]>({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
  });
  useEffect(() => {
    if (!modal.show) {
      queryClient.invalidateQueries({ queryKey: ["users", "all"] });
    }
  }, [modal.show]);
  const { mutate: userMutation, isPending: isMutPending } = useMutation({
    mutationFn: ({
      action,
      user,
      id,
    }: {
      action: string;
      user?: User;
      id?: string;
    }) => {
      if (action === "save") {
        return editUser(user);
      }
      if (action === "delete") {
        return deleteUser(id);
      }
      if (action === "add") {
        return addUser(user);
      }
    },
    onMutate: ({ action, id }) => {
      if (action === "delete") {
        queryClient.cancelQueries();
        queryClient.setQueryData(["users", "all"], (data: User[]) => {
          const oldArr = [...data];
          const newArr = oldArr.filter((user) => user._id !== id);
          return newArr;
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "all"] });
    },
    onSuccess: (_data, { action, user }) => {
      if (action === "add") {
        setModal({ show: true, newPassword: user.password, action: "add" });
        toast.success("Added successfully!");
      }
      if (action === "save") {
        toast.success("Updated successfully!");
      }
      if (action === "delete") {
        toast.success("Deleted successfully!");
      }
    },
    onError: (err: AxiosError<{ message: string[] | string }>) => {
      const error = Array.isArray(err.response.data.message)
        ? err.response.data.message.join(". ")
        : err.response.data.message;
      console.log(error);
      setModal({ show: true, action: "error", message: error });
      toast.error("Error. Task failed.");
    },
  });

  return (
    <>
      <Card>
        <UsersTable
          data={data || []}
          isRefetching={isRefetching}
          isLoading={isLoading || isMutPending}
          onSaveEditUser={(newRow: User) => {
            userMutation({
              user: newRow,
              action: "save",
            });
          }}
          onDeleteUser={(id: string) => {
            setModal({
              show: true,
              action: "delete",
              toDeleteId: id,
            });
          }}
          onAddNewUser={() => {
            const newFakeId = Math.random().toString();
            queryClient.setQueryData(["users", "all"], (data: User[]) => {
              return [
                ...data,
                {
                  _id: newFakeId,
                  name: "",
                  email: "",
                  userName: "",
                  createdAt: new Date(),
                  isBan: false,
                },
              ];
            });
            return newFakeId;
          }}
          onCancelNewUser={(newFakeId: string) => {
            console.log("cancelling new user");

            queryClient.setQueryData(["users", "all"], (data: User[]) => {
              const newArr = [...data];
              return newArr.filter((user) => user._id !== newFakeId);
            });
          }}
          onSaveNewUser={(newUser: User) => {
            const { email, name, userName, phoneNumber } = newUser;
            console.log(newUser);

            const newPassword = generatePassword();
            userMutation({
              action: "add",
              user: {
                password: newPassword,
                email,
                name,
                userName,
                phoneNumber,
              },
            });
          }}
        />
      </Card>
      <Dialog
        open={modal.show}
        onClose={() => {
          setModal(initialModal);
        }}
      >
        <DialogTitle>
          {modal.action === "delete"
            ? "Are you sure to delete this user?"
            : modal.action === "add"
            ? "Add a new user"
            : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modal.action === "delete"
              ? "This action is permanent."
              : modal.action === "add"
              ? "Copy the password to the clipboard."
              : modal.message}
          </DialogContentText>
          {modal.action === "add" ? (
            <Stack direction="row" alignItems="center" mt={2}>
              <Box
                sx={{
                  border: "1px solid gray",
                  borderRadius: "3px",
                  px: 2,
                  py: 1,
                }}
              >
                {modal.newPassword}
              </Box>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(modal.newPassword);
                  }}
                >
                  <ContentCopy />
                </IconButton>
              </Box>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModal(initialModal);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (modal.action === "delete") {
                userMutation({ action: "delete", id: modal.toDeleteId });
              }
              setModal(initialModal);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllUsers;
