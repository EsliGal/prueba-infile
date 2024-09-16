import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Divider, Paper } from '@mui/material';
import { fetchProfileData } from '../service/route'; // Asegúrate de implementar esta función en tu API

const Perfil = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del perfil
    const getProfile = async () => {
      try {
        const profileData = await fetchProfileData(token);
        setUser(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    getProfile();
  }, [token]);

  if (!user) {
    return <Typography>Loading...</Typography>; // Muestra un mensaje mientras se carga la información
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Avatar
        sx={{ width: 120, height: 120, marginBottom: 2 }} // Tamaño del avatar
        alt="User Icon"
        src="/path-to-default-avatar.png" // Ruta al ícono por defecto, puedes cambiar esto según tus necesidades
      />
      <Paper
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom>
          {user.nombre}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body1">
          <strong>Correo Electrónico:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Estado:</strong> {user.estado ? "Activo" : "Inactivo"} {/* Asegúrate de que el campo "estado" existe en los datos de perfil */}
        </Typography>
        <Typography variant="body1">
          <strong>URL:</strong> {user.url} {/* Asegúrate de que el campo "url" existe en los datos de perfil */}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Perfil;