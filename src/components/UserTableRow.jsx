import { TableRow, TableCell, IconButton, Tooltip } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import ModalDeleteUser from './ModalDeleteUser';
import { useState } from 'react';
import ModalEditUser from './ModalEditUser';
import { Link } from 'react-router-dom';

function UserTableRow({ user, handleDeleteUser, handleEditUser, setShow, setSeverity, setMessage }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleOpenEditModal = () => setOpenEditModal(true);

    return (
        <TableRow key={user.id} >
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.birthday}</TableCell>
          <TableCell>
            <Tooltip title="Tasks">
              <Link to={"/tasks/" + user.id}>
                <IconButton onClick={handleOpenEditModal}>
                  <TaskIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </TableCell>
          <TableCell>
            <Tooltip title="Edit">
              <IconButton onClick={handleOpenEditModal}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <ModalEditUser 
              open={openEditModal} 
              handleClose={handleCloseEditModal} 
              user={user} 
              handleEditUser={handleEditUser} 
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
            <ModalDeleteUser 
              id={user.id} 
              open={openDeleteModal} 
              handleClose={handleCloseDeleteModal} 
              handleDeleteUser={handleDeleteUser} 
              setShow={setShow}
              setSeverity={setSeverity}
              setMessage={setMessage} 
            />
          </TableCell>
        </TableRow>
      );
}

export default UserTableRow;