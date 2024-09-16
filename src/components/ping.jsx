import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { ping } from '../service/route';

const Ping = () => {
  const handlePing = async () => {
    try {
      const result = await ping();
      if (result.status === 200) {
        toast.success('Conexión exitosa');
      } else {
        toast.error('Error en la conexión');
      }
    } catch (error) {
      toast.error('Error al hacer ping');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ping
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePing}>
        Hacer Ping
      </Button>
    </Container>
  );
};

export default Ping;