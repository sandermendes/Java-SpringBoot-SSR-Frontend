import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const formValueInitial = {
    name: "",
    docCertId: "",
    phone: "",
    mobilePhone: ""
}

const MaintenanceForm = ({ formType, doctors, setDoctors }) => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState(formType === "add" ? formValueInitial : doctors);
    const [errors, setErrors] = useState({});

    const [openInfo, setOpenInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState({});

    const onSubmit = async ( event ) => {
        event.preventDefault()
        setErrors({})

        if (formType === "edit") {
            setFormValue({
                ...formValue,
                id: doctors.id,
            });
        }

        let res;
        if (formType === "add") {
            res = await fetch(`${process.env.REACT_APP_API_URL}/api/doctor/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
            });
        } else {
            res = await fetch(`${process.env.REACT_APP_API_URL}/api/doctor/edit/${doctors.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
            });
        }
        const result = await res.json();
        if (result.success) {
            if (formType === "add") {
                setDoctors((oldValue) => [ ...oldValue, result.newData ]);
                setFormValue(formValueInitial);
            }
            setErrors({});
            setOpenInfo(true);
            setInfoMessage( result );
        } else {
            setOpenInfo(true);
            setInfoMessage( result );
        }
    }

    const onCancelClick = () => {
        if (formType === "edit") {
            navigate("/doctors")
        }
    }

    const handleChange = ( event ) => {
        const { target } = event
        setFormValue({
            ...formValue,
            [target.name]: target.value,
        });
    }

    return (
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            name="name"
                            value={ formValue.name }
                            onChange={ handleChange }
                            fullWidth
                            inputProps={{ maxLength: 120 }}
                            error={ Object(errors).hasOwnProperty('name') ? (errors.name ? true : false) : false }
                            helperText = { Object(errors).hasOwnProperty('name') ? ( errors.name ? errors.name : '' ) : '' }
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            id="docCertId"
                            label="CRM"
                            name="docCertId"
                            value={ formValue.docCertId }
                            onChange={ handleChange }
                            fullWidth
                            inputProps={{ maxLength: 7 }}
                            error={ Object(errors).hasOwnProperty('docCertId') ? (errors.docCertId ? true : false) : false }
                            helperText = { Object(errors).hasOwnProperty('docCertId') ? ( errors.docCertId ? errors.docCertId : '' ) : '' }
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            id="phone"
                            label="Telefone"
                            name="phone"
                            value={ formValue.phone }
                            onChange={ handleChange }
                            fullWidth
                            inputProps={{ maxLength: 11 }}
                            error={ Object(errors).hasOwnProperty('phone') ? (errors.phone ? true : false) : false }
                            helperText = { Object(errors).hasOwnProperty('phone') ? ( errors.phone ? errors.phone : '' ) : '' }
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            id="mobilePhone"
                            label="Celular"
                            name="mobilePhone"
                            value={ formValue.mobilePhone }
                            onChange={ handleChange }
                            fullWidth
                            inputProps={{ maxLength: 11 }}
                            error={ Object(errors).hasOwnProperty('mobilePhone') ? (errors.mobilePhone ? true : false) : false }
                            helperText = { Object(errors).hasOwnProperty('mobilePhone') ? ( errors.mobilePhone ? errors.mobilePhone : '' ) : '' }
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container direction="row" spacing={2} justifyContent="flex-end" style={{ marginTop: 10 }}>
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} type="submit">Confirmar</Button>
                            <Button color="error" variant="outlined" onClick={ onCancelClick }>Voltar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <Message openInfo={ openInfo } setOpenInfo={ setOpenInfo } infoMessage={ infoMessage } />
        </React.Fragment>
    )
}

export default MaintenanceForm