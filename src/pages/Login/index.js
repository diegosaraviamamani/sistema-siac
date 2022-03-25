import { Button, Container, Stack, Typography } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormInputText from '../../components/FormInputText'
import authService from '../../services/auth.service'
import firebaseAuthErrorCodes from '../../utils/firebaseAuthErrorCodes'
import { inputs, defaultValues } from './utils'

const loginContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  justifyContent: 'center',
  minHeight: '100vh',
}

function Login() {
  const { handleSubmit, reset, control } = useForm({ defaultValues })

  const renderInputs = useCallback(
    () =>
      inputs.map((input, i) => (
        <FormInputText key={i} {...input} control={control} />
      )),
    [control]
  )

  async function login(data) {
    try {
      await authService.login(data)
    } catch (error) {
      alert(firebaseAuthErrorCodes[error.code])
    } finally {
      reset()
    }
  }

  useEffect(() => reset, [reset])

  return (
    <Container maxWidth="xs" sx={loginContainerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          INICIAR SESION
        </Typography>
        {renderInputs()}
        <Button variant="contained" size="large" onClick={handleSubmit(login)}>
          Aceptar
        </Button>
      </Stack>
    </Container>
  )
}
export default Login
