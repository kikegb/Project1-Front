import { Modal, Box, TextField, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import api from "../data/api";
import dayjs from "dayjs";

function ModalEditUser({ open, handleClose, user, handleEditUser, setShow, setSeverity, setMessage }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [birth, setBirth] = useState(dayjs(user.birthday, 'DD-MM-YYYY'));

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

    const handleSaveClick = () => {
        const updatedUser = {
            ...user,
            name: name,
            email: email,
            password: password,
            birthday: birth.format('DD-MM-YYYY')
        };
        api.put('/user', updatedUser)
        .then( (response) => {
            handleEditUser(response.data);
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

    const discardChanges = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setBirth(dayjs(user.birthday, "DD-MM-YYYY"));
    }

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
                <TextField required defaultValue={name} id="user-name" label="Name" type="text" variant="outlined" onChange={handleChangeName}/><br /><br />
                <TextField required defaultValue={email} id="user-email" label="Email" type="email" variant="outlined" onChange={handleChangeEmail}/><br /><br />
                <TextField required defaultValue={password} id="user-password" label="Password" type="password" variant="outlined" onChange={handleChangePassword}/><br /><br />
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

export default ModalEditUser;