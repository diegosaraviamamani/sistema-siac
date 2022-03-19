import { Container, Stack, Typography } from "@mui/material"

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}

function Clients() {
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          CLIENTES
        </Typography>
      </Stack>
    </Container>
  )
}
export default Clients