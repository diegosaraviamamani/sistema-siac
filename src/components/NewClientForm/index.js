import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import useCustomForm from '../../hooks/useRenderForm'
import { defaultValues, inputs } from './utils'
import clientService from '../../services/client.service'

export default function NewResultForm() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { handleSubmit, isSubmitting, renderInputs, reset } = useCustomForm({
    defaultValues,
    inputs,
    onSubmit: async (data) => {
      try {
        const client = {
          name: data.name.toUpperCase(),
          lastName: data.lastName.toUpperCase(),
          phone: data.phone,
        }
        await clientService.add(data.ci, client)
        alert('Cliente creado correctamente')
        handleClose()
      } catch (error) {
        throw error
      }
    },
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset()
  }

  return (
    <React.Fragment>
      {pathname.includes('clientes') && (
        <Button color="inherit" onClick={handleOpen}>
          Nuevo Paciente
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>NUEVA PACIENTE</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <Stack spacing={2} marginY={2}>
            {renderInputs()}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button disabled={isSubmitting} size="large" onClick={handleSubmit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
