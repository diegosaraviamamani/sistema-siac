import { useEffect, useState } from 'react'
import {
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
  Switch,
  TextField,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import clientService from '../services/client.service'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  height: '100%',
}

function Clients() {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleToggleStatus = async (ci, active) => {
    await clientService.update(ci, { active: !active })
  }

  const filteredClients = clients.filter((client) => {
    const keys = Object.keys(client)
    return keys.some((key) => {
      return client[key].toString().toLowerCase().includes(search.toLowerCase())
    })
  })

  useEffect(() => {
    const unsubscribe = clientService.getAll(setClients)
    return unsubscribe
  }, [])

  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center" sx={{ letterSpacing: 5 }}>
            LISTA DE PACIENTES
          </Typography>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Buscar"
            type="search"
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N° C.I.</TableCell>
                  <TableCell>APELLIDO</TableCell>
                  <TableCell>NOMBRE</TableCell>
                  <TableCell>TELEFONO</TableCell>
                  <TableCell align="center">ESTADO</TableCell>
                  <TableCell align="center">ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(search === '' ? clients : filteredClients).map((row) => (
                  <TableRow
                    key={row.ci}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ci}
                    </TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={row.active}
                        onClick={() => handleToggleStatus(row.ci, row.active)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="success"
                        onClick={() => navigate(`/resultados/${row.ci}`)}
                      >
                        <VisibilityIcon />
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
export default Clients
