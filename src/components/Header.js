import LogoutIcon from '@mui/icons-material/Logout'
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import authService from '../services/auth.service'
import NewClientForm from './NewClientForm'
import NewResultForm from './NewResultForm'

function Header() {
  const handleLogout = () => authService.logout()
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SIAC
          </Typography>
          <NewClientForm />
          <NewResultForm />
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
