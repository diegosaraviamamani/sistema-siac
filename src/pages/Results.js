import { useEffect, useState } from 'react'
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
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import testService from './../services/test.service'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  height: '100%',
}
function Results() {
  const [results, setResults] = useState([])
  const { ci } = useParams()
  const navigate = useNavigate()

  const handleReturn = () => navigate(-1)

  useEffect(() => {
    const unsubscribe = testService.getAll(ci, setResults)
    return unsubscribe
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
                {results.length ? (
                  results.map((row) => (
                    <TableRow key={row.order}>
                      <TableCell component="th" scope="row">
                        {row.order}
                      </TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        {row.uploadedAt || 'En proceso'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="error" disabled={!row.uploadedAt}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="success" disabled={!row.uploadedAt}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="primary" disabled={row.uploadedAt}>
                          <UploadFileIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Stack>
  )
}
export default Results
