import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cambia esto por la URL base de tu API
  // Puedes agregar más configuraciones aquí
});

// Puedes agregar interceptores o configuraciones adicionales aquí

export default axiosInstance;