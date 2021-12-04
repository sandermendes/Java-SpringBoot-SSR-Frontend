import React from "react"
import { Snackbar, Alert } from "@mui/material";

const Message = ({ openInfo, setOpenInfo, infoMessage }) => {
    const handleCloseInfo = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenInfo( false );
    };

    return (
        <Snackbar
            open={ openInfo }
            autoHideDuration={ 6000 }
            onClose={ handleCloseInfo }
        >
            <Alert severity={ infoMessage.success ? "success" : "error" } onClose={ handleCloseInfo } sx={{ width: '100%' }}>
                { infoMessage.message }
            </Alert>
        </Snackbar>
    )

}

export default Message