import axios from 'axios';

const API_URL = 'https://candidates-exam.herokuapp.com/api/v1';

export const ping = () => axios.get(`${API_URL}/ping`);

export const register = (userData) => axios.post(`${API_URL}/usuarios`, userData);

export const login = (loginData) => axios.post(`${API_URL}/auth/login`, loginData);

export const fetchProfileData = async (token) => {
  const response = await fetch('https://candidates-exam.herokuapp.com/api/v1/usuarios/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data; 
};
export const uploadCV = (url, formData, token) => axios.post(`${API_URL}/usuarios/${url}/cargar_cv`, formData, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

export const getCV = (token) => axios.get(`${API_URL}/usuarios/mostrar_cv`, {
  headers: { Authorization: `Bearer ${token}` }
});