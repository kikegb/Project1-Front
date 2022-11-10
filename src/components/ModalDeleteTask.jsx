import { Modal, Box, Button } from "@mui/material";
import api from "../data/api";

function ModalDeleteTask({ id, open, handleClose, handleDeleteTask, setShow, setSeverity, setMessage }) {
    
    const handleDeleteClick = () => {
        api.delete('/task?id=' + id)
        .then( (response) => {
            handleDeleteTask(id);
            setSeverity('success');
            setMessage('Task deleted successfully!');
            setShow(true);
        })
        .catch( (error) => {
            if (error.response) {
                setSeverity('error')
                if (error.response.data.code === 1) {
                    setMessage("Error: This task doesn't exist.");
                } else {
                    setMessage("Error " + error.response.status);
                }
                setShow(true);
            }
        });
        handleClose();
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="boxModal"
                component="form"
            >
                <h3>Are you sure you want to delete this task?</h3>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
                
            </Box>
        </Modal>
    );
}

export default ModalDeleteTask;