import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Link } from '@mui/material';
import { register } from '../service/route';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success('Registro exitoso');
      navigate('/');
    } catch (error) {
      toast.error('Error en el registro');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
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
        <TextField
          label="Confirmar Contraseña"
          name="password_confirmation"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        <Link href="/" underline="none"  sx={{ color: theme => theme.palette.secondary.main }} >
          Volver al login
        </Link>
      </Typography>
    </Container>
  );
};

export default Registro;