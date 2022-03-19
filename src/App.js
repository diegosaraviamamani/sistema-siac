import { Route, Routes } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import Login from './pages/Login'
import Results from './pages/Results';

function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Inicio</div>} />
      <Route path='/about' element={<div>About</div>} />
      <Route path='/login' element={<Login />} />
      <Route path='/clientes' element={<Clients />} />
      <Route path='/resultados' element={<Results />} />
    </Routes>
  );
}

export default App;
