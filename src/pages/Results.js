import { Container, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import Header from "../components/Header"

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}

function Results() {
  const { ci } = useParams()
  //await getDocs(query(collection(db, 'clients', ci, 'testResults')));
  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            RESULTADOS {ci}
          </Typography>
        </Stack>
      </Container>
    </Stack>
  )
}
export default Results