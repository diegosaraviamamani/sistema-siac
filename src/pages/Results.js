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
import DeleteIcon from '@mui/icons-material/Delete'
import testService from './../services/test.service'
import TestOptionDropown from '../components/TestOptionDropdown'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  height: '100%',
  padding: 4,
}
function Results() {
  const navigate = useNavigate()
  const { ci } = useParams()
  const [results, setResults] = useState([])

  const handleReturn = () => navigate(-1)

  useEffect(() => {
    const unsubscribe = testService.getAll(ci, setResults)
    return unsubscribe
  }, [ci])

  const handleDelete = async (order) => {
    if (window.confirm('¿Está seguro de eliminar la prueba?')) {
      try {
        await testService.remove(ci, order)
        window.alert('Prueba eliminada')
      } catch (error) {
        window.alert(error.message)
      }
    }
  }

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
                  <TableCell align="center">FECHA SOLICITUD</TableCell>
                  <TableCell align="center">TIPO</TableCell>
                  <TableCell align="center">FECHA DE RESULTADO</TableCell>
                  <TableCell align="center">ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.length ? (
                  results.map((row) => (
                    <TableRow key={row.order}>
                      <TableCell component="th" scope="row">
                        {row.order}
                      </TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          color={row.uploadedAt ? 'limegreen' : 'orange'}
                        >
                          {row.uploadedAt || 'En proceso'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.order)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <TestOptionDropown ci={ci} {...row} />
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
