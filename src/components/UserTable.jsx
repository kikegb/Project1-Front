import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import UserTableRow from './UserTableRow';
import { useState } from "react";
import SnackbarAlert from "./SnackbarAlert";

function UserTable({ users, handleDeleteUser, handleEditUser }) {
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const handleCloseSnackbar = () => { setShow(false); }
  const rows = [];
  let lastUser = null;

  users.forEach(user => {
      if (user.id !== lastUser) {
          rows.push(
              <UserTableRow 
                user={user} 
                key={user.id}
                handleDeleteUser={handleDeleteUser}
                handleEditUser={handleEditUser}
                setShow={setShow}
                setSeverity={setSeverity}
                setMessage={setMessage} 
              />
          );
      } 
  });

  return(
    <>
      <TableContainer component={Paper} className='BasicTable'>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Birthdate</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {rows}
          </TableBody>
        </Table>
      </TableContainer>
      <SnackbarAlert show={show} severity={severity} message={message} handleClose={handleCloseSnackbar} />
    </>
  );
}

export default UserTable;