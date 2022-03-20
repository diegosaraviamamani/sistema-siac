import LogoutIcon from "@mui/icons-material/Logout"
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { signOut } from "firebase/auth"
import { firebaseAuth } from "../utils/firebaseConfig"

function Header() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">

      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SIAC
        </Typography>
        <IconButton color="inherit"  onClick={() => signOut(firebaseAuth)}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header