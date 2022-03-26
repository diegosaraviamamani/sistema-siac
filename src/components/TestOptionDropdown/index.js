import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import storageService from '../../services/storage.service'
import UploadFileMenuItem from './UploadFileMenuItem'

const TestOptionDropown = ({ ci, order, uploadedAt }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleOpenPDF = async () => {
    handleClose()
    try {
      const options = {
        ci,
        order,
        omitActive: true,
      }
      const url = await storageService.getFileUrl(options)
      window.open(url)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDeletePDF = async () => {
    handleClose()
    if (window.confirm('¿Esta seguro que desea eliminar el archivo?')) {
      try {
        await storageService.deleteFile({ ci, order })
        alert('Archivo eliminado correctamente')
      } catch (error) {
        alert(error.message)
      } finally {
        handleClose()
      }
    }
  }

  return (
    <React.Fragment>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem disabled={!uploadedAt} onClick={handleDeletePDF}>
          Eliminar PDF
        </MenuItem>
        <MenuItem disabled={!uploadedAt} onClick={handleOpenPDF}>
          Ver PDF
        </MenuItem>
        <UploadFileMenuItem
          {...{ ci, order, uploadedAt }}
          onClick={handleClose}
        />
      </Menu>
    </React.Fragment>
  )
}

export default TestOptionDropown
