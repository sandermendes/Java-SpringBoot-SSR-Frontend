import React, {useEffect, useState} from "react";
import { Avatar, Box, Card, CardContent, CardHeader, Container, Divider, Fab,
    Grid, List, ListItem, ListItemAvatar, Modal, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import axios from "axios";
import MaintenanceForm from "./Components/maintenanceForm";

const ListField = ({ label, data, breakLine = false }) => {
    return (
        <Grid container direction="column">
            <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="subtitle2"
                color="text.primary"
            >
                { label }
            </Typography>
            <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.secondary"
                style={ breakLine ? { whiteSpace: 'pre-line', lineHeight: 0.7 } : {} }
            >
                { data }
            </Typography>
        </Grid>
    )
}

const ModalAdd = ({ open, handleClose, doctors, setDoctors }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Adicionar Médico
                </Typography>
                <MaintenanceForm formType="add" doctors={doctors} setDoctors={setDoctors}/>
            </Box>
        </Modal>
    )
}

function App() {
    const [doctors, setDoctors] = useState()
    const [open, setOpen] = useState(false)

    const fetchDoctors = () => {
        axios.get("http://localhost:8080/doctors")
            .then((response) => {
                console.log('response', response.data)
                setDoctors(response.data)
            })
    }

    useEffect(() => {
        fetchDoctors();
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Container maxWidth="sm" style={{
            backgroundColor: '#E5E5E5',
            minHeight: '100vh',
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{my: 4, padding: 10, width: 800}}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', top: 25, position: 'relative' }}>
                    <Fab color="primary" onClick={ handleOpen }>
                        <AddIcon/>
                    </Fab>
                </div>
                <Card>
                    <CardHeader title="Médicos"/>
                    <CardContent>
                        { (Array.isArray(doctors) && !doctors.length) && <div>Sem dados</div> }
                        {Array.isArray(doctors) && doctors &&
                        <List>
                            {doctors.map((doctor, index) =>
                                <div key={index} style={{ margin: '10px 0' }}>
                                    <ListItem>
                                        <ListItemAvatar >
                                            <Avatar alt={doctor.name} src=""/>
                                        </ListItemAvatar>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12} >
                                                <Typography
                                                    component="span"
                                                    variant="h5"
                                                    color="text.primary"
                                                >
                                                    { doctor.name }
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container direction="row" spacing={3}>
                                                    <Grid item >
                                                        <ListField label="CRM" data={ doctor.docCertId } />
                                                    </Grid>
                                                    <Grid item >
                                                        <ListField label="Telefone" data={ doctor.phone } />
                                                    </Grid>
                                                    <Grid item >
                                                        <ListField label="Celular" data={ doctor.mobilePhone } />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {(index < doctors.length - 1) && <Divider component="li"/>}
                                </div>
                            )}
                        </List>
                        }
                    </CardContent>
                </Card>
            </Box>
            <ModalAdd
                open={ open }
                handleClose={ handleClose }
                doctors={ doctors }
                setDoctors={ setDoctors }
            />
        </Container>
    )

}

export default App;
