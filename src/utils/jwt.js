import { decodeJwt, jwtVerify } from 'jose'

export const decodeToken = (token) => {
  try {
    return decodeJwt(token);
  } catch (error) {
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET));

    return payload;
  } catch (error) {
    return false;
  }
};