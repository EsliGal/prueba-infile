import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Ping from './components/ping';
import Registro from './components/registro';
import Login from './components/login';
import Perfil from './components/perfil';
import CargarCV from './components/cargarCV';
import MostrarCV from './components/mostrarCV';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87EBD7',
      contrastText: '#3F4531',
    },
    secondary: {
      main: '#499167',
      contrastText: '#499167',
    },
    
    background: {
      default: '#D4FFF6', 
    },
    text: {
      primary: '#3F4531',
      secondary: '#3F4531', 
    },
  },
  typography: {
    fontFamily: 'Averta, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  }
});

const App = () => {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Prueba técnica
            </Typography>
            <Button color="inherit" component={Link} to="/">Inicio</Button>
            <Button color="inherit" component={Link} to="/ping">Ping</Button>
            {token && (
              <>
                <Button color="inherit" component={Link} to="/perfil">Perfil</Button>
                <Button color="inherit" component={Link} to="/cargar-cv">Cargar CV</Button>
                <Button color="inherit" component={Link} to="/mostrar-cv">Mostrar CV</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth={false} sx={{
            minHeight: '100vh', 
            backgroundColor: theme.palette.background.default,
            padding: 2
          }}>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} setUrl={setUrl} />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/ping" element={<Ping />} />
            {token && (
              <>
                <Route path="/perfil" element={<Perfil token={token} />} />
                <Route path="/cargar-cv" element={<CargarCV token={token} url={url} />} />
                <Route path="/mostrar-cv" element={<MostrarCV token={token} />} />
              </>
            )}
          </Routes>
        </Container>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;