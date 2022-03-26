import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import testService from '../../services/test.service'

export default function NewClientForm() {
  const { pathname } = useLocation()
  const { ci } = useParams()
  const [open, setOpen] = useState(false)
  const { handleSubmit, isSubmitting, renderInputs, reset } = useCustomForm({
    defaultValues,
    inputs,
    onSubmit: async (data) => {
      try {
        const { order, type } = data
        await testService.add({ ci, order, type })
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
    <div>
      {pathname.includes('resultados') && (
        <Button color="inherit" onClick={handleOpen}>
          Nueva Prueba
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>NUEVA PRUEBA</DialogTitle>
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
    </div>
  )
}
