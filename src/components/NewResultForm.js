import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Modal, Typography, TextField, Button, Stack } from '@mui/material'
import { db } from '../utils/firebaseConfig'
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewClientForm() {
    const { pathname } = useLocation()
    const { ci } = useParams()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [result, setResult] = useState({ type: "", order: "" })


    async function createResult() {
        setLoading(true)
        await setDoc(doc(db, 'clients', ci, "testResults", result.order), {
            type: result.type,
            createdAt: new Timestamp(Math.round(new Date().getTime() / 1000), 0)
        })

        setLoading(false)
        handleClose()
    }

    return (
        <div>
            {pathname.includes('resultados') && <Button color="inherit" onClick={handleOpen}>Nueva Prueba</Button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Nueva Prueba
                        </Typography>
                        <TextField
                            value={result.order}
                            onChange={(e) => setResult({ ...result, order: e.target.value })}
                            label="Nro de Orden"
                            variant="outlined"
                        />
                        <TextField
                            value={result.type}
                            onChange={(e) => setResult({ ...result, type: e.target.value })}
                            label="Tipo de prueba"
                            variant="outlined"
                        />
                        <Button
                            disabled={loading}
                            variant="contained"
                            size="large"
                            onClick={() => createResult()}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
