import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Modal, Typography, TextField, Button, Stack } from '@mui/material'
import { db } from '../utils/firebaseConfig'
import { setDoc, doc, Timestamp } from "firebase/firestore";

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [client, setClient] = useState({ ci: '', name: '', lastName: '', phone: '' })


  async function createClient() {
    setLoading(true)
    await setDoc(doc(db, 'clients', client.ci), {
      name: client.name,
      lastName: client.lastName,
      phone: client.phone,
      active: true,
      createdAt: new Timestamp(Math.round(new Date().getTime() / 1000), 0)
    })

    setLoading(false)
    handleClose()
  }

  return (
    <div>
      {pathname.includes('clientes') && <Button color="inherit" onClick={handleOpen}>Nuevo Cliente</Button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nuevo Cliente
            </Typography>
            <TextField
              value={client.ci}
              onChange={(e) => setClient({ ...client, ci: e.target.value })}
              label="Carnet de Identidad"
              variant="outlined"
            />
            <TextField
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              label="Nombre"
              variant="outlined"
            />

            <TextField
              value={client.lastName}
              onChange={(e) => setClient({ ...client, lastName: e.target.value })}
              label="Apellidos"
              variant="outlined"
            />
            <TextField
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
              label="Telefono"
              variant="outlined"
            />
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              onClick={() => createClient()}
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
