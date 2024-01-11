import { verifyToken, decodeToken } from "../utils/jwt";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token and user
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const [role, setRole] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? decodeToken(t).role : null;
  });


  // Check if token is valid
  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          const response = await verifyToken(token);
          // Adjust this condition based on how verifyToken indicates an invalid token
          if (!response) {
            clearAuth();
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          clearAuth();
        }
      }
    };
    verify();
  }, [token]);  // Include token as a dependency

  // Function to clear authentication
  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  // Function to set the authentication token
  const setTokenAndUser = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setRole(decodeToken(newToken).role);
  };

  // Update axios headers and localStorage when token or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    } else {
      clearAuth();
    }
  }, [token, user]); // Include user as a dependency

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken: setTokenAndUser,
      user,
      setUser,
      role
    }),
    [token, user]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
