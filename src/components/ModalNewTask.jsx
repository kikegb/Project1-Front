import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../data/api";

function ModalNewTask({ open, handleClose, handleNewTask, setShow, setSeverity, setMessage }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectItems, setSelectItems] = useState([]);

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeUserId = (event) => {
        setUserId(event.target.value);
    }

    const handleAddClick = () => {
        const task = {
            title: title,
            description: description,
            done: false
        };
        api.post('/task', task)
        .then( (response) => {
            handleNewTask(response.data);
            setSeverity('success');
            setMessage('Task added successfully!');
            setShow(true);
        })
        .catch( (error) => {
            if (error.response) {
                setSeverity('error')
                setMessage("Error " + error.response.status);
                setShow(true);
            }
        });
        handleClose();
    }

    useEffect(() => {
        api.get('/user/getAll')
        .then( (response) => {
            var menuItems = [];
            response.data.forEach(user => {
                menuItems.push(
                    <MenuItem value={user.id}>{user.name}</MenuItem>
                );
            });
          setSelectItems(menuItems);
        });
      }, []);

    return(
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className="boxModal"
                component="form"
            >
                <h3>Add a new task</h3>
                <TextField required id="task-title" label="Title" variant="outlined" onChange={handleChangeTitle}/><br /><br />
                <TextField required id="task-description" label="Description" variant="outlined" onChange={handleChangeDescription}/><br /><br />
                <TextField
                    required
                    select
                    id="task-user-id"
                    value={userId}
                    label="User"
                    variant="outlined"
                    onChange={handleChangeUserId}
                    sx={{ width: '55%' }}
                >
                    {selectItems}
                </TextField><br /><br />
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleAddClick}
                >
                    Add
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalNewTask;