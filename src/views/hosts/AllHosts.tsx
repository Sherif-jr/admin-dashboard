import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import HostsTable from "./HostsTable/HostsTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Host } from "../../interfaces/Host.interface";
import {
  deleteHost,
  editHost,
  getAllHosts,
} from "../../util/query/httpFunctions/hostHttpFunctions";
import queryClient from "../../util/query/queryClient";

interface ModalState {
  show: boolean;
  toDeleteId?: string;
}
const initialState: ModalState = { show: false, toDeleteId: null };

const AllHosts = () => {
  const [modal, setModal] = useState<ModalState>(initialState);
  const { data, isPending } = useQuery<Host[]>({
    queryKey: ["hosts", "all"],
    queryFn: getAllHosts,
  });
  const { mutate, isPending: isMutPending } = useMutation({
    mutationFn: ({
      action,
      host,
      id,
    }: {
      action: string;
      host?: Host;
      id?: string;
    }) => {
      if (action === "save") {
        return editHost(host);
      }
      if (action === "delete") {
        return deleteHost(id);
      }
    },
    onMutate: ({ action, id }) => {
      if (action === "delete") {
        queryClient.cancelQueries();
        queryClient.setQueryData(["hosts", "all"], (data: Host[]) => {
          const oldArr = [...data];
          const newArr = oldArr.filter((host) => host._id !== id);
          return newArr;
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hosts", "all"] });
    },
    onSuccess: (_, { action }) => {
      if (action === "delete") {
        setModal(initialState);
      }
    },
  });
  return (
    <>
      <Card>
        <HostsTable
          data={data || []}
          onSaveEditHost={(newRow: Host) => {
            mutate({ action: "save", host: newRow });
          }}
          onDeleteHost={(id: string) => {
            setModal({ show: true, toDeleteId: id });
          }}
          isLoading={isPending || isMutPending}
        />
      </Card>
      <Dialog
        open={modal.show}
        onClose={() => {
          setModal(initialState);
        }}
      >
        <DialogTitle>
          Are you sure to delete this host along with all its created events?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModal(initialState);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              mutate({ action: "delete", id: modal.toDeleteId });
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllHosts;
