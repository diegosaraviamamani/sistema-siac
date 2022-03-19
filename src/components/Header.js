import LogoutIcon from "@mui/icons-material/Logout"
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Header() {
const navigate=useNavigate()
function logout(){
  navigate("/login")
}

  return (
    <AppBar position="static">
      <Container maxWidth="xl">

      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SIAC
        </Typography>
        <IconButton color="inherit" onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header