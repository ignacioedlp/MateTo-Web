// Este archivo tendra dos funciones, una para decodificar el token y otra para verificar si el token es valido.

import { decodeJwt, jwtVerify } from 'jose'


// Decodificar el token
export const decodeToken = (token) => {
  try {
    return decodeJwt(token);
  } catch (error) {
    return null;
  }
};

// Verificar token
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET));

    return payload;
  } catch (error) {
    return false;
  }
};