import { Route, Routes } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import Login from './pages/Login'
import Query from './pages/Query';
import Results from './pages/Results';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Query />} />
      <Route path='/login' element={<Login />} />
      <Route path='/clientes' element={<Clients />} />
      <Route path='/resultados' element={<Results />} />
    </Routes>
  );
}

export default App;
