import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/token';
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Recuperar token del localStorage al cargar la página
    const storedToken = localStorage.getItem('token');
    return storedToken ?? null;
  });

  const login = async (username, password) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setToken(response.data.access_token);
    } catch (error) {
      console.error('Login error', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    // Implementa aquí la lógica para eliminar el token
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
