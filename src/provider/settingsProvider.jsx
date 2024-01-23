import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/apiServices';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.settings.getSettings().request;
        setSettings(response.data);
      } catch (error) {
        console.error('Error al obtener los ajustes:', error);
      }
    };

    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    try {
      const response = await api.settings.getSettings().request;
      setSettings(response.data);
    } catch (error) {
      console.error('Error al obtener los ajustes:', error);
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  return useContext(SettingsContext);
};

export default SettingsProvider;