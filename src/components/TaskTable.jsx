import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import TaskTableRow from "./TaskTableRow";
import { useState } from "react";
import SnackbarAlert from "./SnackbarAlert";

function TaskTable({ tasks, handleDeleteTask, handleEditTask, handleCheckboxTask }) {
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const handleCloseSnackbar = () => { setShow(false); }
  const rows = [];
  let lastTask = null;

  tasks.forEach(task => {
      if (task.id !== lastTask) {
          rows.push(
              <TaskTableRow 
                task={task} 
                key={task.id}
                handleDeleteTask={handleDeleteTask}
                handleEditTask={handleEditTask}
                handleCheckboxTask={handleCheckboxTask}
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
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Done?</TableCell>
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

export default TaskTable;