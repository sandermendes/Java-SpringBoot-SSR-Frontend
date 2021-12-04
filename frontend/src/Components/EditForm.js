import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "./Main";
import { Box, Typography } from "@mui/material";
import MaintenanceForm from "./maintenanceForm";

const formValueInitial = {
    name: "",
    docCertId: "",
    phone: "",
    mobilePhone: ""
}

const EditForm = (props) => {
    const doctorId = props.match.params.id

    const [doctor, setDoctor] = useState(formValueInitial)
    const [loading, setLoading] = useState(true)

    const fetchDoctor = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/doctor/${doctorId}`)
            .then((response) => {
                setDoctor(response.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchDoctor();
    }, [])

    return (
        <Main>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                border: '1px solid #0a0a0a',
                boxShadow: 6,
                borderRadius: 4,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Editar Médico
                </Typography>
                {!loading && <MaintenanceForm formType="edit" doctors={doctor} setDoctors={setDoctor}/>}
            </Box>
        </Main>
    )
}

export default EditForm;