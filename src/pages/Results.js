import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Header from '../components/Header'
import { db } from '../utils/firebaseConfig'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  height: '100%',
}
async function getData(setresults, ci) {
  const result = await getDocs(
    query(collection(db, 'clients', ci, 'testResults'))
  )
  setresults(
    result ? result.docs.map((c) => ({ order: c.id, ...c.data() })) : []
  )
}
function Results() {
  const [results, setresults] = useState([])
  const { ci } = useParams()
  const navigate = useNavigate()
  function todate(seconds) {
    const date = new Date(seconds * 1000)
    return new Intl.DateTimeFormat('es-ES').format(date)
  }
  //handle return with navigate
  const handleReturn = () => {
    navigate(-1)
  }
  useEffect(() => {
    getData(setresults, ci)
  }, [ci])
  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Button onClick={handleReturn} sx={{ alignSelf: 'end' }}>
            Volver
          </Button>
          <Typography variant="h5" align="center" sx={{ letterSpacing: 5 }}>
            REPORTE DE RESULTADOS
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N° ORDEN.</TableCell>
                  <TableCell align="right">FECHA SOLICITUD</TableCell>
                  <TableCell align="right">TIPO</TableCell>
                  <TableCell align="right">FECHA DE RESULTADO</TableCell>
                  <TableCell align="right">CARGAR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row) => (
                  <TableRow
                    key={row.order}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell align="right">
                      {todate(row.createdAt.seconds)}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      {row.uploadetAt && todate(row.uploadedAt.seconds)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="success">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <UploadFileIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Stack>
  )
}
export default Results
