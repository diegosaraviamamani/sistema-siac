import React, { useState } from 'react'
import {
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import useCustomForm from '../../hooks/useRenderForm'
import { inputs } from './utils'
import clientService from '../../services/client.service'

export default function EditClientForm({ data }) {
  const [open, setOpen] = useState(false)
  const { handleSubmit, isSubmitting, renderInputs, reset } = useCustomForm({
    defaultValues: data,
    inputs,
    onSubmit: async (data) => {
      if (window.confirm('¿Esta seguro que desea actualizar la información?')) {
        try {
          const { ci, name, lastName, phone } = data
          await clientService.update(ci, { name, lastName, phone })
          handleClose()
        } catch (error) {
          throw error
        }
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
      {
        <IconButton color="warning" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      }
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>EDITAR PACIENTE</DialogTitle>
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
