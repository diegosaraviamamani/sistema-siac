import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FileUpload from 'react-material-file-upload'
import storageService from '../../services/storage.service'

const UploadFileMenuItem = ({ ci, order, onClick, uploadedAt }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      files: [],
    },
  })
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onClick()
  }

  const onSubmit = async ({ files }) => {
    try {
      handleClose()
      await storageService.uploadFile({ ci, order }, files[0])
      alert('Archivo subido correctamente')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <React.Fragment>
      <MenuItem color="inherit" onClick={handleClick} disabled={!!uploadedAt}>
        Subir PDF
      </MenuItem>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>NUEVA PRUEBA</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <Stack spacing={2} marginY={2}>
            <Controller
              name="files"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FileUpload
                  value={value}
                  onChange={onChange}
                  multiple={false}
                  accept=".pdf"
                  title="Click para selecciona o arrastre una imagen. (Tamaño maximo: 7MB)"
                  buttonText="Selecciona el documento PDF"
                  maxSize={7340032}
                  buttonProps={{
                    variant: 'outlined',
                  }}
                  typographyProps={{
                    variant: 'body2',
                    color: 'textSecondary',
                  }}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            size="large"
            disabled={!watch('files').length}
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default UploadFileMenuItem
