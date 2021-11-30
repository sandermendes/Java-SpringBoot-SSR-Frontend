import React, { FunctionComponent, SyntheticEvent, useState } from "react";
import {
    Button, Checkbox, FormControl, FormHelperText, Grid, InputLabel, LinearProgress, ListItemText,
    MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField
} from "@mui/material";
// import { useRouter } from "next/router";
// import Message from "./message";

const formValueInitial = {
    name: "",
    docCertId: "",
    phone: "",
    mobilePhone: ""
}

const MaintenanceForm = ({ formType, doctors, setDoctors }) => {
    // const route = useRouter();

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
            console.log('JSON.stringify(formValue)', JSON.stringify(formValue))
            res = await fetch(`http://localhost:8080/doctor`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
            });
        } else {
            res = await fetch(`${process.env.MAIN_URL}/api/doctor/edit/${doctors.id}`, {
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
            let tempErrors = {};
            result.info.inner.map((validationField) => {
                if (!Object(tempErrors).hasOwnProperty(validationField.path)) {
                    tempErrors = {
                        ...tempErrors,
                        [validationField.path]: validationField.errors[0]
                    }
                }
                setErrors( tempErrors );
            })
            setOpenInfo(true);
            setInfoMessage( result );
        }
    }

    // const onCancelClick = () => {
    //     if (formType === "edit") {
    //         route.push(`${process.env.MAIN_URL}`)
    //     }
    // }

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
                            {/*<Button color="error" variant="outlined" onClick={ onCancelClick }>Voltar</Button>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            {/*<Message openInfo={ openInfo } setOpenInfo={ setOpenInfo } infoMessage={ infoMessage } />*/}
        </React.Fragment>
    )
}

export default MaintenanceForm