import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Container, Fab, Stack, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import storageService from '../../services/storage.service'
import { inputs, defaultValues } from './utils'
import FormInputText from '../../components/FormInputText'

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
  const navigate = useNavigate()

  const { handleSubmit, reset, control } = useForm({ defaultValues })

  const renderInputs = useCallback(
    () =>
      inputs.map((input, i) => (
        <FormInputText key={i} {...input} control={control} />
      )),
    [control]
  )

  const handleQuery = async (data) => {
    try {
      setLoading(true)
      const { ci, order } = data
      const url = await storageService.getFileUrl({ ci, order })
      window.open(url)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <Container maxWidth="xs" sx={containerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          CONSULTA
        </Typography>
        <Typography variant="caption" align="center">
          Mantener activadas las ventanas emergentes en caso que el navegador
          abra el PDF en otra ventana.
        </Typography>
        {renderInputs()}
        <Button
          disabled={loading}
          variant="contained"
          size="large"
          onClick={handleSubmit(handleQuery)}
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
