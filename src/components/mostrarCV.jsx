import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { getCV } from '../service/route';

const MostrarCV = ({ token }) => {
  const [cvUrl, setCvUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        setLoading(true);
        const result = await getCV(token);
        setCvUrl(result.data.url);
        setError(null); // Limpiar error si la carga es exitosa
      } catch (error) {
        setError('Error al mostrar el CV');
        toast.error('Error al mostrar el CV');
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mostrar CV
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : cvUrl ? (
        <iframe
          src={cvUrl}
          width="100%"
          height="600px"
          title="CV"
          style={{ border: 'none' }} 
        />
      ) : (
        <Typography variant="body1">
          No se ha cargado ningún CV.
        </Typography>
      )}
    </Container>
  );
};

export default MostrarCV;
