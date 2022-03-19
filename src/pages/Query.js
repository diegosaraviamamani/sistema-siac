import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  justifyContent: 'center',
  minHeight: '100vh',
}

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
    </Container>
  )
}
export default Query