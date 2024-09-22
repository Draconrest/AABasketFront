import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Recuperar token del localStorage al cargar la página
    const storedToken = localStorage.getItem('token');
    return storedToken ?? null;
  });

  const logout = () => {
    // Implementa aquí la lógica para eliminar el token
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
