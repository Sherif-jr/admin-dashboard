import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Avatar, Box } from "@mui/material";
import { Event } from "../../../interfaces/Event.interface";
import { User } from "../../../interfaces/User.interface";
import { getUser } from "../../../util/query/httpFunctions/userHttpFunctions";

const UserEmailCell = ({ id }) => {
  const [userEmail, setUserEmail] = useState("...");
  useEffect(() => {
    async function getEmail() {
      const user: User = await getUser(id);
      setUserEmail(user.email);
    }
    getEmail();
  }, []);
  return <p>{userEmail}</p>;
};

const EventsTable = ({ data, isLoading, onSaveEditEvent, onDeleteEvent }) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  //click handlers
  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleDeleteClick = (id: GridRowId) => {
    onDeleteEvent(id);
  };
  //process handlers
  const processRowUpdate = (newRow: GridRowModel<Event>) => {
    onSaveEditEvent(newRow);
    return newRow;
  };
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  //columns for data grid
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      flex: 1,
      minWidth: 200,
      editable: true,
      renderCell: ({ row, value }) => {
        return (
          <>
            <Avatar src={row.posterPath} sx={{ mr: 1 }} />
            <p>{value}</p>
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 1,
      minWidth: 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "ticketCount",
      headerName: "Total Tickets",
      type: "number",
      editable: true,
      align: "center",
      width: 100,
    },
    {
      field: "createdBy",
      headerName: "created by",
      type: "string",
      minWidth: 250,
      flex: 1,
      renderCell: ({ value }) => {
        return <UserEmailCell id={value} />;
      },
    },
    {
      field: "dateTime",
      headerName: "Scheduled Date",
      type: "date",
      editable: true,
      width: 100,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      valueGetter: (params) => new Date(params.value),
      type: "date",
      width: 100,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => {
                handleSaveClick(id);
              }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => {
                handleCancelClick(id);
              }}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              handleEditClick(id);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              handleDeleteClick(id);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: { xs: "100vh", md: "80vh" }, width: "100%" }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        loading={isLoading}
        // onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(err) => {
          console.log(err);
        }}
      />
    </Box>
  );
};

export default EventsTable;
