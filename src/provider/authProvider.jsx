import axiosInstance from '../utils/apiServices';
import { verifyToken } from "../utils/jwt";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser_] = useState(JSON.parse(localStorage.getItem("user")));

  // Chequeo que si tengo un token, verifique si es valido
  useEffect(() => {
    const verify = async () => {
      if (token) {
        const response = await verifyToken(token);
        if (!response) {
          delete axiosInstance.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setToken(null);
          setUser(null);
        }
      }
    }
    verify();
  }, []);

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUser = (newUser) => {
    setUser_(newUser);
  }

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;