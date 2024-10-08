import { useState } from 'react';
import api from 'contexts/Auth-api';
const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users';

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const updateUser = async (userData, token) => {
    const updateEndpoint = `${endpoint}/${userData.id}`;
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await api.put(updateEndpoint, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(error.response?.data || 'Error al actualizar el usuario');
      setIsLoading(false);
      throw error;
    }
  };

  return { updateUser, isLoading, isError };
}
