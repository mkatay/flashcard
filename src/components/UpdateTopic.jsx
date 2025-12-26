import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
  gridEditRowsStateSelector,
  useGridSelector,
  useGridApiContext,
  GridActionsCell,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
   randomId,
 
} from '@mui/x-data-grid-generator';
import { useEffect } from 'react';
import { readTopicsOnce } from '../firestoreBackend';
import { useState } from 'react';


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

const ActionHandlersContext = React.createContext({
  handleCancelClick: () => {},
  handleDeleteClick: () => {},
  handleEditClick: () => {},
  handleSaveClick: () => {},
});

function ActionsCell(props) {
  const apiRef = useGridApiContext();
  const rowModesModel = useGridSelector(apiRef, gridEditRowsStateSelector);
  const isInEditMode = typeof rowModesModel[props.id] !== 'undefined';

  const { handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick } =
    React.useContext(ActionHandlersContext);

  return (
    <GridActionsCell {...props}>
      {isInEditMode ? (
        <React.Fragment>
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            material={{ sx: { color: 'primary.main' } }}
            onClick={() => handleSaveClick(props.id)}
          />
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={() => handleCancelClick(props.id)}
            color="inherit"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(props.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(props.id)}
            color="inherit"
          />
        </React.Fragment>
      )}
    </GridActionsCell>
  );
}

const columns = [
  { field: 'name', headerName: 'Name', width: 200, flex:1,editable: true },
  
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    renderCell: (params) => <ActionsCell {...params} />,
  },
];

export const UpdateTopic=()=> {
  const [rows, setRows] = React.useState([]);
  const [loading,setLoading]=useState(false)
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(()=>{
    readTopicsOnce(setRows,setLoading)
  },[])
console.log(rows);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const actionHandlers = React.useMemo(
    () => ({
      handleEditClick: (id) => {
        setRowModesModel((prevRowModesModel) => ({
          ...prevRowModesModel,
          [id]: { mode: GridRowModes.Edit },
        }));
      },
      handleSaveClick: (id) => {
        setRowModesModel((prevRowModesModel) => ({
          ...prevRowModesModel,
          [id]: { mode: GridRowModes.View },
        }));
      },
      handleDeleteClick: (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      },
      handleCancelClick: (id) => {
        setRowModesModel((prevRowModesModel) => {
          return {
            ...prevRowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
          };
        });

        setRows((prevRows) => {
          const editedRow = prevRows.find((row) => row.id === id);
          if (editedRow.isNew) {
            return prevRows.filter((row) => row.id !== id);
          }
          return prevRows;
        });
      },
    }),
    [],
  );

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)),
    );
    return updatedRow;
  };

  return (
    <Box
      sx={{
        height: 500,
       
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <ActionHandlersContext.Provider value={actionHandlers}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          showToolbar
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </ActionHandlersContext.Provider>
    </Box>
  );
}
