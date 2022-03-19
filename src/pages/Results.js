import { Container, Stack, Typography } from "@mui/material"
import Header from "../components/Header"

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}

function Results() {
  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            CLIENTES
          </Typography>
        </Stack>
      </Container>
    </Stack>
  )
}
export default Results