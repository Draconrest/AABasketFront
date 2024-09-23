// hooks/useCreateUser.js
import { useState } from 'react';
import axios from 'axios';

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const createUser = async (userData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.post('/api/users', userData);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(error.response?.data || 'Error al crear el usuario');
      setIsLoading(false);
      throw error;
    }
  };

  return { createUser, isLoading, isError };
}
