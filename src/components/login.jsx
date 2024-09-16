
import { login } from '../service/route';
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setToken, setUrl }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(formData);
      setToken(result.data.token);
      setUrl(result.data.url);
      toast.success('Login exitoso');
      navigate('/perfil');
    } catch (error) {
      toast.error('Error en el login');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        <Link href="/registro" underline="none"  sx={{ color: theme => theme.palette.secondary.main }} >
          No tengo cuenta, registrarme
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;