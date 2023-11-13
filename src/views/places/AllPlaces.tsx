import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  deletePlace,
  editPlace,
  getAllPlaces,
} from "../../util/query/httpFunctions/placeHttpFunctions";
import { Host } from "../../interfaces/Host.interface";
import queryClient from "../../util/query/queryClient";
import { toast } from "react-toastify";
import PlacesTable from "./PlacesTable/PlacesTable";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Place } from "../../interfaces/Place.interface";

interface ModalState {
  show: boolean;
  toDeleteId?: string;
}
const initialState: ModalState = { show: false, toDeleteId: null };

const AllPlaces = () => {
  const [modal, setModal] = useState<ModalState>(initialState);
  const { data, isPending } = useQuery<Host[]>({
    queryKey: ["places", "all"],
    queryFn: getAllPlaces,
  });
  console.log(data);

  const { mutate, isPending: isMutPending } = useMutation({
    mutationFn: ({
      action,
      place,
      id,
    }: {
      action: string;
      place?: Place;
      id?: string;
    }) => {
      if (action === "save") {
        return editPlace(place);
      }
      if (action === "delete") {
        return deletePlace(id);
      }
    },
    onMutate: ({ action, id }) => {
      if (action === "delete") {
        queryClient.cancelQueries();
        queryClient.setQueryData(["places", "all"], (data: Place[]) => {
          const oldArr = [...data];
          const newArr = oldArr.filter((host) => host._id !== id);
          return newArr;
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["places", "all"] });
    },
    onSuccess: (_, { action }) => {
      if (action === "delete") {
        setModal(initialState);
        toast.success("Deleted Successfully");
      }
      if (action === "save") {
        toast.success("Updated Successfully");
      }
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });
  return (
    <>
      <Card>
        <PlacesTable
          data={data || []}
          onSaveEditHost={(newRow: Place) => {
            mutate({ action: "save", place: newRow });
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

export default AllPlaces;
