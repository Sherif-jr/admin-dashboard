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
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
//icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditOffIcon from "@mui/icons-material/EditOff";
import { Box, Button, Tooltip } from "@mui/material";
import { User } from "../../../../interfaces/User.interface";

function EditToolbar({ onAddNewUser, newUserFkId, setNewUserFkId }) {
  const handleClick = () => {
    if (newUserFkId === null) {
      const newFakeId = onAddNewUser();
      setNewUserFkId(newFakeId);
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add New Admin
      </Button>
    </GridToolbarContainer>
  );
}

const AdminsTable = ({
  data,
  isRefetching,
  isLoading,
  onAddNewUser,
  onCancelNewUser,
  onSaveNewUser,
  onSaveEditUser,
  onDeleteUser,
  canEdit,
}) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [newUserFkId, setNewUserFkId] = useState<string>(null);
  //reset newUserFkId when refetching
  useEffect(() => {
    if (isRefetching === true) {
      setNewUserFkId(null);
    }
  }, [isRefetching]);

  useEffect(() => {
    if (newUserFkId !== null) {
      setRowModesModel((oldModel) => {
        return {
          ...oldModel,
          [newUserFkId]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        };
      });
    }
  }, [newUserFkId]);
  //click handlers
  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleCancelClick = (id: GridRowId) => {
    if (id !== newUserFkId) {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    } else {
      onCancelNewUser(id);
      setNewUserFkId(null);
    }
  };
  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleDeleteClick = (id: GridRowId) => {
    onDeleteUser(id);
  };
  //process handlers
  const processRowUpdate = (newRow: GridRowModel<User>) => {
    if (newRow._id !== newUserFkId) {
      onSaveEditUser(newRow);
      return newRow;
    } else {
      onSaveNewUser(newRow);
      setNewUserFkId(null);
      return newRow;
    }
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
      field: "name",
      headerName: "Name",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "isOwner",
      headerName: "Is Owner?",
      type: "boolean",
      flex: 1,
    },

    {
      field: "createdAt",
      headerName: "Account Created At",
      valueGetter: (params) => new Date(params.value),
      type: "date",
      width: 140,
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        if (canEdit) {
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
        } else {
          return [
            <Tooltip disableInteractive title="Only owner can edit!">
              <GridActionsCellItem
                icon={<EditOffIcon />}
                label="NoEdit"
              ></GridActionsCellItem>
            </Tooltip>,
          ];
        }
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
        slots={{
          toolbar: canEdit ? EditToolbar : undefined,
        }}
        slotProps={{
          toolbar: {
            onAddNewUser,
            newUserFkId,
            setNewUserFkId,
            setRowModesModel,
            data,
          },
        }}
      />
    </Box>
  );
};

export default AdminsTable;
