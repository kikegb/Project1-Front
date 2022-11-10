import { Alert, Snackbar } from "@mui/material";

function SnackbarAlert({ show, severity, message, handleClose }) {

    return(
        <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;