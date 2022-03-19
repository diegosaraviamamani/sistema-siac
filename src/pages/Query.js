import { useState } from "react"
import { Button, Container, Fab, Stack, TextField, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';

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
};

function Query() {
  const [queryData, setQueryData] = useState({ order: "", ci: "" })
  return (
    <Container maxWidth="xs" sx={containerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          CONSULTA
        </Typography>
        <TextField
          value={queryData.order}
          onChange={(e) => setQueryData({ ...queryData, order: e.target.value })}
          label="Nro de Orden"
          variant="outlined"
        />
        <TextField
          value={queryData.ci}
          onChange={(e) => setQueryData({ ...queryData, ci: e.target.value })}
          label="Carnet de Identidad"
          variant="outlined"
        />
        <Button
          variant="contained"
          size="large"
          onClick={() => console.log(queryData)}
        >
          Aceptar
        </Button>
      </Stack>
      <Fab sx={fabStyle} color="success">
        <LoginIcon color="white"/>
      </Fab>
    </Container>
  )
}
export default Query