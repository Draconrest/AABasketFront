import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const refreshTokenEndpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/token';
const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/login';
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('access_token') ?? null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem('refresh_token') ?? null;
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

      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (error) {
      console.error('Login error', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    // Implementa aquí la lógica para eliminar el token
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(refreshTokenEndpoint, { refresh_token: refreshToken });
      const newAccessToken = response.data.access_token;

      setAccessToken(newAccessToken); // Update React state
      localStorage.setItem('access_token', newAccessToken); // Update localStorage
      return newAccessToken;
    } catch (error) {
      console.error('Token refresh error', error);
      logout(); // Log out if token refresh fails
      throw new Error('Failed to refresh token');
    }
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }
  }, [refreshToken]);

  return <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, refreshAccessToken }}>{children}</AuthContext.Provider>;
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
