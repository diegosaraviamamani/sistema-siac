import { useState } from 'react'
import {
  Button,
  Container,
  Fab,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useNavigate } from 'react-router-dom'
import storageService from '../services/storage.service'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  justifyContent: 'center',
  minHeight: '100vh',
}
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
}

function Query() {
  const [loading, setLoading] = useState(false)
  const [queryData, setQueryData] = useState({ order: '', ci: '' })
  const navigate = useNavigate()

  const handleQuery = async () => {
    try {
      setLoading(true)
      const { ci, order } = queryData
      const url = await storageService.getFileUrl({ ci, order })
      window.open(url)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) =>
    setQueryData({ ...queryData, [e.target.name]: e.target.value })

  return (
    <Container maxWidth="xs" sx={containerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          CONSULTA
        </Typography>
        <TextField
          name="ci"
          value={queryData.ci}
          onChange={handleChange}
          label="Carnet de Identidad"
          variant="outlined"
        />
        <TextField
          name="order"
          value={queryData.order}
          onChange={handleChange}
          label="Nro de Orden"
          variant="outlined"
        />
        <Button
          disabled={loading}
          variant="contained"
          size="large"
          onClick={handleQuery}
        >
          Aceptar
        </Button>
      </Stack>
      <Fab sx={fabStyle} color="success" onClick={() => navigate('/login')}>
        <LoginIcon color="white" />
      </Fab>
    </Container>
  )
}
export default Query
