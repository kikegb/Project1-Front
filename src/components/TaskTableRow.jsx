import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import CheckboxState from './CheckboxState';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDeleteTask from './ModalDeleteTask';
import { useState, useEffect } from 'react';
import ModalEditTask from './ModalEditTask';
import api from '../data/api';

function TaskTableRow({ task, handleDeleteTask, handleEditTask, handleCheckboxTask, setShow, setSeverity, setMessage }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      api.get('/user/findById?id=' + task.userId)
      .then( (response) => {
        setUser(response.data);
      });
    }, [task.userId]);

    return (
        <TableRow key={task.id} >
          <TableCell>{task.title}</TableCell>
          <TableCell>{task.description}</TableCell>
          <TableCell>{user? user.name:''}</TableCell>
          <TableCell>
            <Tooltip title="Edit">
              <IconButton onClick={handleOpenEditModal}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <ModalEditTask 
              open={openEditModal} 
              handleClose={handleCloseEditModal} 
              task={task} 
              handleEditTask={handleEditTask} 
              setShow={setShow}
              setSeverity={setSeverity}
              setMessage={setMessage} 
            />
          </TableCell>
          <TableCell>
            <Tooltip title="Delete">
              <IconButton onClick={handleOpenDeleteModal}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <ModalDeleteTask 
              id={task.id} 
              open={openDeleteModal} 
              handleClose={handleCloseDeleteModal} 
              handleDeleteTask={handleDeleteTask}
              setShow={setShow}
              setSeverity={setSeverity}
              setMessage={setMessage} 
            />
          </TableCell>
          <TableCell>
            <CheckboxState done={task.done} handleCheckboxTask={handleCheckboxTask} id={task.id} />
            </TableCell>
        </TableRow>
      );
}

export default TaskTableRow;