import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/apiServices';
import { useAuth } from './authProvider';

// Crear el contexto
export const FavoritesContext = createContext();

// Crear el provider
const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = async (id) => {
    try {
      const response = await axiosInstance.get(`/favorites/${id}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al agregar el favorito:', error);
    }
  }

  const removeFavorite = async (id) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${id}`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error al eliminar el favorito:', error);
    }
  }

  useEffect(() => {
    // Función para obtener los ajustes
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error al obtener los ajustes:', error);
      }
    };



    fetchFavorites();


  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export default FavoritesProvider;