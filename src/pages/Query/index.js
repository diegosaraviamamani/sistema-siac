import { useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import {
  Button,
  Container,
  Fab,
  Grid,
  Stack,
  Typography,
  Paper,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import storageService from '../../services/storage.service'
import { inputs, defaultValues } from './utils'
import FormInputText from '../../components/FormInputText'
import styled from '@emotion/styled'
import reloj from "./reloj.jpg"
import logo from '../Imagen.jpg'
import iconoface from './iconoface.ico'
import iconowat from './iconowat.ico'
import imagen from './images.png'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  justifyContent: 'center',
  minHeight: '100vh',
  gap: '32px',
}
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
}

const Item = styled(Paper)(() => ({
  backgroundColor: '#fff',
  padding: '16px',
  textAlign: 'center',
}))

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
    <Container sx={containerStyles}>
      <Container maxWidth="xs">
        <img src={logo} alt="logo" height={'330px'} />
        <Paper>
          <Stack spacing={2} padding={4}>
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
        </Paper>
        <Fab sx={fabStyle} color="success" onClick={() => navigate('/login')}>
          <LoginIcon color="white" />
        </Fab>
      </Container>
      <Container maxWidth="xl">
        <Grid container justify="center">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item><h2>Informacion de contacto</h2>

                <img src={iconoface} alt="iconoface" height="70 px" />
                <p>SIAC SALUD INTEGRAL Y ANALISIS CLINICO</p>
                <img src={iconowat} alt="iconowat" height="70 px" />
                <p>TELEFONO DE CONTACTO:76400025 </p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item><h2>Horarios de Atenci??n</h2>

                <img src={reloj} alt="reloj" height="100 px" />
                <p>Nuestros horarios de atenci??n son</p>
                <p>de Lunes a S??bado en los horarios  </p>
                <p>establecidos a continuaci??n:</p>
                <p><b>Lunes a Viernes: </b>8:00 - 19:00 Hrs.</p>
                <p><b>S??bados: </b>8:00 - 12:30 Hrs.</p>
              </Item>

            </Grid>
            <Grid item xs={4}>
              <Item>
                <h2>Ubicaci??n</h2>
                <img src={imagen} alt="imagen" height="100 px" />
                <p>Estamos ubicados en</p>
                <p>Calle: Villa Tunari Entre Incachaqui y Calle: Chapare </p>
                <p>Cochabamba-Bolivia:</p>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}
export default Query
