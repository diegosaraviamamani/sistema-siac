import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Header from "../components/Header"
import { db } from "../utils/firebaseConfig";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'strech',
  minHeight: '100vh'
}
function Results() {
  const [results, setresults] = useState([])
  const { ci } = useParams()
  async function getData() {
    const result = await getDocs(query(collection(db, 'clients',ci, 'testResults')));
    setresults(result ? result.docs.map((c) => ({ order: c.id, ...c.data() })) : [])
  }
  function todate(seconds){
    const date=new Date(seconds*1000)
    return new Intl.DateTimeFormat('es-ES').format(date)
  }
  useEffect(() => {
    getData(setresults)
  }, [])
  return (
    <Stack>
      <Header />
      <Container maxWidth="lg" sx={containerStyles}>
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
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
                    <TableCell align="right">{todate(row.createdAt.seconds)}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{todate(row.uploadedAt.seconds)}</TableCell>
                    <TableCell align="right">
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                      >
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