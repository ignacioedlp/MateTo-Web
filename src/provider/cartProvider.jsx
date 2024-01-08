import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/apiServices';
import { useAuth } from './authProvider';


// Crear el contexto
export const CartContext = createContext();

// Crear el provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCart = async (data) => {
    try {
      const response = await axiosInstance.post(`/cart`, {
        ...data
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error al agregar el cart:', error);
    }
  }

  const removeCart = async (id) => {
    try {
      const response = await axiosInstance.delete(`/cart/${id}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error al eliminar el cart:', error);
    }
  }

  useEffect(() => {
    // Función para obtener los ajustes
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error al obtener los ajustes:', error);
      }
    };


    fetchCart();


  }, []);

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;