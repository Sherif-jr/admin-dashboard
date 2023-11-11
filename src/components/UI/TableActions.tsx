import { useState } from "react";
import {
  IconButton,
  Stack,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Delete from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import { User } from "../../interfaces/User.interface";

interface ActionsProps {
  actionsFor: "user" | "event";
  params: GridValueGetterParams;
  onAction: (action: "edit" | "delete" | "ban", row: object) => void;
}

const Actions: React.FC<ActionsProps> = ({
  params,
  actionsFor,
  onAction,
}: ActionsProps) => {
  const [modal, setModal] = useState<{
    show: boolean;
    user: User | null;
    title: string;
    body: string;
  }>({
    show: false,
    user: null,
    title: "",
    body: "",
  });
  console.log(params.value);

  return (
    <>
      <Stack direction="row" gap="2">
        <Tooltip
          title={actionsFor === "user" ? "Edit user" : "Edit Event"}
          disableInteractive
        >
          <IconButton
            onClick={() => {
              onAction("edit", params.row);
              setModal({
                show: true,
                title: "Hello",
                user: params.value,
                body: "Edit user",
              });
            }}
          >
            <Edit color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={actionsFor === "user" ? "Delete user" : "Delete Event"}
          disableInteractive
        >
          <IconButton
            onClick={() => {
              onAction("delete", params.row);
            }}
          >
            <Delete color="error" />
          </IconButton>
        </Tooltip>
        {actionsFor === "user" && (
          <Tooltip
            title={params.row.isBan ? "Unban user" : "Ban user"}
            disableInteractive
          >
            <IconButton
              onClick={() => {
                onAction("ban", params.row);
              }}
            >
              {params.row.isBan ? (
                <AddCircleOutlineIcon />
              ) : (
                <BlockIcon color="warning" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Dialog
        open={modal.show}
        onClose={() => {
          setModal((prev) => ({ ...prev, show: false }));
        }}
      >
        <DialogTitle>{modal.title}</DialogTitle>
        <DialogContent>{modal.body}</DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
