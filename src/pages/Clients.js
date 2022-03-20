import { collection, getDocs, query } from "firebase/firestore";
import { Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Header from "../components/Header"
import { db } from "../utils/firebaseConfig";
import { useEffect, useState } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import Switch from '@mui/material/Switch';
import { Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}
async function getData(setclients) {
  const result = await getDocs(query(collection(db, 'clients')));
  setclients(result ? result.docs.map((c) => ({ ci: c.id, ...c.data() })) : [])
}
function Clients() {
  const [clients, setclients] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getData(setclients)
  }, [])

  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            LISTA DE CLIENTES
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N° C.I.</TableCell>
                  <TableCell align="right">NOMBRE</TableCell>
                  <TableCell align="right">APELLIDO</TableCell>
                  <TableCell align="right">TELEFONO</TableCell>
                  <TableCell align="right">ESTADO</TableCell>
                  <TableCell align="right">ACCIONES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((row) => (
                  <TableRow
                    key={row.ci}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ci}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">
                      <div>
                        <Switch {...Label} checked={row.active} />
                      </div>
                    </TableCell>
                    <TableCell align="right">
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