import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './contexts/AuthContext';
import Clients from './pages/Clients';
import Login from './pages/Login'
import Query from './pages/Query';
import Results from './pages/Results';

function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path='/' element={<Query />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/clientes' />} />
      <Route path='/clientes' element={user ? <Clients /> : <Navigate to='/login' />} />
      <Route path='/resultados' element={user ? <Results /> : <Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
