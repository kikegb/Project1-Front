import { Modal, Box, TextField, Button, Switch, FormControlLabel, MenuItem } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import api from "../data/api";

function ModalEditTask({ open, handleClose, task, handleEditTask, setShow, setSeverity, setMessage }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [done, setDone] = useState(task.done);
    const [userId, setUserId] = useState(task.userId);
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
    
    const handleSaveClick = () => {
        var updatedTask = {
            ...task,
            title: title,
            description: description,
            done: done,
            userId: userId
        };
        api.put('/task', updatedTask)
        .then( (response) => {
            handleEditTask(response.data);
            setSeverity('success');
            setMessage('User data changes saved!');
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
    const handleSwitchChange = (event) => {
        setDone(event.target.checked);
    }

    const discardChanges = () => {
        setTitle(task.title);
        setDescription(task.description);
        setDone(task.done);
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
            onClose={() => {
                discardChanges();
                handleClose();
            }}
        >
            <Box className="boxModal"
                component="form"
            >
                <h3>Add a new task</h3>
                <TextField required defaultValue={title} id="task-title" label="Title" variant="outlined" onChange={handleChangeTitle}/><br /><br />
                <TextField required defaultValue={description} id="task-description" label="Description" variant="outlined" onChange={handleChangeDescription}/><br /><br />
                <TextField
                    required
                    select
                    id="task-user-id"
                    value={userId}
                    label="User"
                    defaultValue={userId}
                    variant="outlined"
                    onChange={handleChangeUserId}
                    sx={{ width: '55%' }}
                >
                    {selectItems}
                </TextField><br /><br />
                <FormControlLabel
                    control={ <Switch checked={done} onChange={handleSwitchChange}></Switch> }
                    label="Mark as done"
                    labelPlacement="start"
                /><br /><br />
                <Button 
                    onClick={() => {
                        discardChanges();
                        handleClose();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSaveClick}
                >
                    Save changes
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalEditTask;