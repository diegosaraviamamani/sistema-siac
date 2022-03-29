import LogoutIcon from '@mui/icons-material/Logout'
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'
import NewClientForm from './NewClientForm'
import NewResultForm from './NewResultForm'

function Header() {
  const handleLogout = () => authService.logout()
  const navigate = useNavigate()
  return (
    <AppBar position="static" sx={{ backgroundColor: '#eb7d26' }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
              component="span"
              onClick={() => navigate('/')}
            >
              SIAC
            </Typography>
          </Box>
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
