import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEvent,
  editEvent,
  getAllEvents,
} from "../../util/query/httpFunctions/eventHttpFunctions";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EventsTable from "./EventsTable/EventsTable";
import { Event } from "../../interfaces/Event.interface";
import queryClient from "../../util/query/queryClient";
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalState {
  show: boolean;
  toDeleteId?: string;
}
const initialState: ModalState = { show: false, toDeleteId: null };
const AllEvents = () => {
  const [modal, setModal] = useState<ModalState>(initialState);
  const { data, isPending } = useQuery<Event[]>({
    queryKey: ["events", "all"],
    queryFn: getAllEvents,
  });
  const { mutate, isPending: isMutPending } = useMutation({
    mutationFn: ({
      action,
      event,
      id,
    }: {
      action: string;
      event?: Event;
      id?: string;
    }) => {
      if (action === "save") {
        return editEvent(event);
      }
      if (action === "delete") {
        return deleteEvent(id);
      }
    },
    onMutate: ({ action, id }) => {
      if (action === "delete") {
        queryClient.cancelQueries();
        queryClient.setQueryData(["events", "all"], (data: Event[]) => {
          const oldArr = [...data];
          const newArr = oldArr.filter((event) => event._id !== id);
          return newArr;
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "all"] });
    },
    onSuccess: (_, { action }) => {
      if (action === "delete") {
        setModal(initialState);
        toast.error("Deleted Successfully!");
      }
      if (action === "save") {
        toast.success("Updated Successfully!");
      }
    },
    onError: () => {
      toast.error("Error. Task failed.");
    },
  });

  return (
    <>
      <Card>
        <EventsTable
          data={data || []}
          onSaveEditEvent={(newRow: Event) => {
            mutate({ action: "save", event: newRow });
          }}
          onDeleteEvent={(id: string) => {
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
        <DialogTitle>Are you sure to delete this event?</DialogTitle>
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

export default AllEvents;
