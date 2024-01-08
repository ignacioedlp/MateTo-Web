import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/apiServices';

// Crear el contexto
export const SettingsContext = createContext();

// Crear el provider
const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // Función para obtener los ajustes
    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get('/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error al obtener los ajustes:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;