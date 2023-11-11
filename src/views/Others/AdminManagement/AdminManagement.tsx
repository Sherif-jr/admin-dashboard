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
import AdminsTable from "./AdminsTable/AdminTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addAdmin,
  deleteAdmin,
  editAdmin,
  getAdmins,
} from "../../../util/query/httpFunctions/adminHttpFunctios";
import { Admin } from "../../../interfaces/Admin.interface";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import queryClient from "../../../util/query/queryClient";
import { AxiosError } from "axios";
import generatePassword from "../../../util/passwordGenetator";
import { useAuthContext } from "../../../hooks/useAuthContext";

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

const AdminManagement = () => {
  const [modal, setModal] = useState<ModalState>(initialModal);
  const { user } = useAuthContext();
  const { data, isRefetching, isPending } = useQuery<Admin[]>({
    queryKey: ["admins", "all"],
    queryFn: getAdmins,
    initialData: [],
  });
  const { mutate: userMutation, isPending: isMutPending } = useMutation({
    mutationFn: ({
      action,
      user,
      id,
    }: {
      action: string;
      user?: Admin;
      id?: string;
    }) => {
      if (action === "save") {
        return editAdmin(user);
      }
      if (action === "delete") {
        return deleteAdmin(id);
      }
      if (action === "add") {
        return addAdmin(user);
      }
    },
    onMutate: ({ action, id }) => {
      if (action === "delete") {
        queryClient.cancelQueries();
        queryClient.setQueryData(["admins", "all"], (data: Admin[]) => {
          const oldArr = [...data];
          const newArr = oldArr.filter((user) => user._id !== id);
          return newArr;
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admins", "all"] });
    },
    onSuccess: (_data, { action, user }) => {
      if (action === "add") {
        setModal({ show: true, newPassword: user.password, action: "add" });
      }
    },
    onError: (err: AxiosError<{ message: string[] | string }>) => {
      const error = Array.isArray(err.response.data.message)
        ? err.response.data.message.join(". ")
        : err.response.data.message;
      console.log(error);
      setModal({ show: true, action: "error", message: error });
    },
  });

  return (
    <>
      <Card>
        <AdminsTable
          canEdit={user.isOwner}
          data={data}
          isLoading={isPending || isMutPending}
          isRefetching={isRefetching}
          onSaveEditUser={(newRow: Admin) => {
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
            queryClient.setQueryData(["admins", "all"], (data: Admin[]) => {
              return [
                ...data,
                {
                  _id: newFakeId,
                  name: "",
                  email: "",
                  createdAt: new Date(),
                },
              ];
            });
            return newFakeId;
          }}
          onCancelNewUser={(newFakeId: string) => {
            queryClient.setQueryData(["admins", "all"], (data: Admin[]) => {
              const newArr = [...data];
              return newArr.filter((user) => user._id !== newFakeId);
            });
          }}
          onSaveNewUser={(newUser: Admin) => {
            const { email, name } = newUser;
            const newPassword = generatePassword();
            userMutation({
              action: "add",
              user: {
                password: newPassword,
                email,
                name,
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

export default AdminManagement;
