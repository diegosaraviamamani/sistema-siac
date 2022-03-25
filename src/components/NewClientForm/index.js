import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { inputs, defaultValues } from './utils'
import FormInputText from '../FormInputText'
import clientService from '../../services/client.service'

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
}

export default function NewClientForm() {
  const { handleSubmit, reset, control } = useForm({ defaultValues })

  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const renderInputs = useCallback(
    () =>
      inputs.map((input, i) => (
        <FormInputText key={i} {...input} control={control} />
      )),
    [control]
  )

  async function createClient(data) {
    try {
      setLoading(true)
      const client = {
        name: data.name.toUpperCase(),
        lastName: data.lastName.toUpperCase(),
        phone: data.phone,
      }
      await clientService.add(data.ci, client)
      alert('Cliente creado correctamente')
      reset()
      handleClose()
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => reset, [reset])

  return (
    <div>
      {pathname.includes('clientes') && (
        <Button color="inherit" onClick={handleOpen}>
          Nuevo Paciente
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <IconButton onClick={handleClose} sx={{ alignSelf: 'end' }}>
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              align="center"
              sx={{ marginTop: '0 !important' }}
            >
              Nuevo Paciente
            </Typography>
            {renderInputs()}
            <Button
              disabled={loading}
              variant="contained"
              size="large"
              onClick={handleSubmit(createClient)}
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
