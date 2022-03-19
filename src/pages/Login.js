import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { firebaseAuth } from "../utils/firebaseConfig"

const loginContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  justifyContent: 'center',
  minHeight: '100vh'
}

function Login() {
  const [credentials, setCredentials] = useState({ email: 'sistema', password: '12345678' })

  async function login() {
    await signInWithEmailAndPassword(firebaseAuth, credentials.email, credentials.password)
  }

  useEffect(() => {
    const salir = onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user)
    })
    return salir
  }, [])

  return (
    <Container maxWidth="xs" sx={loginContainerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          INICIAR SESION
        </Typography>
        <TextField
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          label="Correo"
          variant="outlined"
        />
        <TextField
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          label="Contraseña"
          variant="outlined"
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => login()}
        >
          Aceptar
        </Button>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => signOut(firebaseAuth)}
        >
          Cerrar sesion
        </Button>
      </Stack>
    </Container>
  )
}
export default Login