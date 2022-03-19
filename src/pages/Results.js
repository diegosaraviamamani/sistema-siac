import { Container, Stack, Typography } from "@mui/material"

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}

function Results() {
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center">
          RESULTADOS
        </Typography>
      </Stack>
    </Container>
  )
}
export default Results