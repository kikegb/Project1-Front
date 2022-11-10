import { Checkbox } from "@mui/material";
import { useState } from "react";
import api from "../data/api";
import SnackbarAlert from "./SnackbarAlert";

function CheckboxState({ done, handleCheckboxTask, id }) {
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    
    function handleChange() {
        api.patch('/task?id=' + id + '&done=' + !done)
        .then( (response) => {
            handleCheckboxTask(id);
            setSeverity('success');
            setMessage('Task state changed successfully!');
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
    }

    return(
        <>
            <Checkbox checked={done} onChange={handleChange}/>
            <SnackbarAlert show={show} severity={severity} message={message} handleClose={handleClose} />
        </>
    );
}

export default CheckboxState;