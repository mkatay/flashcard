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

import { useEffect } from 'react';
import { addTopic, deleteTopicWithCards, readCardsOnce, readTopicsOnce, updateTopic } from '../firestoreBackend';
import { useState } from 'react';
import { } from 'material-ui-confirm';
import { useConfirm } from 'material-ui-confirm';
import { Typography } from '@mui/material';


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  
const handleClick = async () => {
  try {
    const id = await addTopic(''); // itt meghívod, és megvárod az ID-t
    setRows((oldRows) => [...oldRows,{ id, name: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  } catch (error) {
    console.error('Hiba új témakör hozzáadásakor:', error);
    // Itt kezelheted a hibát (pl. értesítés)
  }
};
  return (
    <Toolbar>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" style={{color:'green'}}/>
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
            icon={<EditIcon style={{color:'blue'}}/>}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(props.id)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon style={{color:'red'}}/>}
            label="Delete"
            onClick={() => handleDeleteClick(props.id,props.row.name)}
            color="inherit"
          />
        </React.Fragment>
      )}
    </GridActionsCell>
  );
}

const columns = [
  { field: 'question', headerName: 'Kérdés', minWidth: 200, flex:1,editable: true ,
     renderCell: (params) => (
        <Box
        sx={{
            whiteSpace: 'pre-wrap',   // \n + sortörés
            wordBreak: 'break-word',  // hosszú szavak törése
            lineHeight: 1.4,
        }}
        >
        {params.value}
        </Box>
    ),
  },
  { field: 'answer', headerName: 'Válasz', minWidth: 400, flex:1,editable: true ,
     renderCell: (params) => (
        <Box
        sx={{
            whiteSpace: 'pre-wrap',   // \n + sortörés
            wordBreak: 'break-word',  // hosszú szavak törése
            lineHeight: 1.4,
        }}
        >
        {params.value}
        </Box>
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    renderCell: (params) => <ActionsCell {...params} />,
  },
];

export const UpdateCardsFromSelTopic=({id})=> {
  const [rows, setRows] = React.useState([]);
  const [loading,setLoading]=useState(false)
  const [rowModesModel, setRowModesModel] = React.useState({});
  const confirm = useConfirm();

  useEffect(()=>{
    readCardsOnce(id,setRows)
  },[id])
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
      handleDeleteClick: async (id,name) => {
        try {
          const { confirmed, reason } = await confirm({ description:'Ez egy visszavonhatatlan művelet!',
                            confirmationText:'igen',
                            cancellationText:'mégsem',
                            title:`Biztosan ki szeretnéd törölni a **${name}** témakört?`
                  })
          if(confirmed){
             await deleteTopicWithCards(id); // először Firestore-ban törlünk
             setRows(prevRows => prevRows.filter((row) => row.id !== id));
          }else console.log(reason);
          } catch (error) {
              console.log('mégsem:',error);
          }
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
  const processRowUpdate = async (newRow, oldRow) => {
    if (newRow.name === oldRow.name)  return oldRow; // nincs update
    try {
      await updateTopic(newRow.id, {name: newRow.name});
      const updatedRow = { ...newRow, isNew: false };
      setRows((prevRows) => prevRows.map((row) =>row.id === newRow.id ? updatedRow : row));
      return updatedRow; // ✅ commit
    } catch (error) {
      console.error(error);
      throw error; // ❗ kötelező rollbackhez
    }
};


  return (
    <Box
      sx={{
        height: 500,
        width: '100%',   
       
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Typography sx={{color:"white"}}>Kártyák</Typography>
      <ActionHandlersContext.Provider value={actionHandlers}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowHeight={() => 'auto'}
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
