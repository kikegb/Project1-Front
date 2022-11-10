import { Modal, Box, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import api from "../data/api";

function ModalNewUser({ open, handleClose, handleNewUser, setShow, setSeverity, setMessage }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth, setBirth] = useState(null);

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeBirth = (newDate) => {
        setBirth(newDate);
    }

    const handleAddClick = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            birthday: birth.format('DD-MM-YYYY')
        };
        api.post('/user', user)
        .then( (response) => {
            handleNewUser(response.data);
            setSeverity('success');
            setMessage('User added successfully!');
            setShow(true);
        })
        .catch( (error) => {
            if (error.response) {
                setSeverity('error')
                if (error.response.data.code === 1) {
                    setMessage("Error: There's already a user with that email.");
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
                <h3>Add a new user</h3>
                <TextField required id="user-name" label="Name" type="text" variant="outlined" onChange={handleChangeName}/><br /><br />
                <TextField required id="user-email" label="Email" type="email" variant="outlined" onChange={handleChangeEmail}/><br /><br />
                <TextField required id="user-password" label="Password" type="password" variant="outlined" onChange={handleChangePassword}/><br /><br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disableFuture
                        views={['day', 'month', 'year']}
                        value={birth}
                        label="Birthdate"
                        inputFormat="DD-MM-YYYY"
                        onChange={handleChangeBirth}
                        renderInput={(params) => <TextField required {...params} />}
                    />
                </LocalizationProvider><br /><br />
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

export default ModalNewUser;