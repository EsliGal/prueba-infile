import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { uploadCV } from '../service/route';

const CargarCV = ({ token, url }) => {
  const [cv, setCv] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.pdf',
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles) => {
      setCv(acceptedFiles[0]);
    },
    onDropRejected: () => {
      toast.error('El archivo debe ser un PDF y no mayor a 5MB');
    },
  });

  const handleUpload = async () => {
    if (cv) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('curriculum', cv);
        await uploadCV(url, formData, token);
        toast.success('CV cargado exitosamente');
        setCv(null); // Limpia el archivo después de la carga
      } catch (error) {
        toast.error('Error al cargar el CV');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cargar CV
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 2,
          padding: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 'background.paper',
          marginBottom: 2,
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">Suelta el archivo aquí...</Typography>
        ) : (
          <Typography variant="body1">
            Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar uno
          </Typography>
        )}
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!cv || uploading}
        >
          {uploading ? <CircularProgress size={24} color="inherit" /> : 'Cargar CV'}
        </Button>
      </Box>
    </Container>
  );
};

export default CargarCV;
