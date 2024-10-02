// hooks/useCreateUser.js
import { useState } from 'react';
import axios from 'axios';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users';

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const createUser = async (userData, token) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.post(endpoint, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
