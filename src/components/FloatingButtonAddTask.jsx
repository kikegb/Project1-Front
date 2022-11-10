import { Fab, ThemeProvider, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "./Theme"
import ModalNewTask from "./ModalNewTask";
import { useState } from "react";
import SnackbarAlert from "./SnackbarAlert";

function FloatingButtonAddTask({ handleNewTask }) {
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const handleCloseSnackbar = () => { setShow(false); }

    return(
        <ThemeProvider theme={theme}>
            <Tooltip title="New Task">
                <Fab 
                    color="custom" 
                    aria-label="add"
                    onClick={handleOpenModal}
                    sx={{
                        position: "absolute",
                        right: "5%",
                        bottom: "5%"
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <ModalNewTask 
                open={openModal} 
                handleClose={handleCloseModal} 
                handleNewTask={handleNewTask} 
                setShow={setShow}
                setSeverity={setSeverity}
                setMessage={setMessage} 
            />
            <SnackbarAlert show={show} severity={severity} message={message} handleClose={handleCloseSnackbar} />
        </ThemeProvider>
    );
}

export default FloatingButtonAddTask;