import axios from 'axios';
//import { useAuth } from './AuthContext'; // Importa tu AuthContext
const BASE_URL = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT;

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_HOST_ENDPOINT
});

// Interceptor for requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses (handling token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 error)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await api.post(`${BASE_URL}/token`, { refresh_token: refreshToken });

          const newAccessToken = data.access_token;
          localStorage.setItem('access_token', newAccessToken);

          // Update AuthContext with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token', err);
          // Handle token refresh failure by logging out the user
          window.location.href = '/login'; // Or use your logout function
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
