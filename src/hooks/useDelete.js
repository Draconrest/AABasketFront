// hooks/useCreateUser.js
import { useState } from 'react';
import api from 'contexts/Auth-api';
const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users';

export function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const deleteUser = async (userId, token) => {
    const deleteEndpoint = `${endpoint}/${userId}`;
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await api.delete(deleteEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(error.response?.data || 'Error al eliminar el usuario');
      setIsLoading(false);
      throw error;
    }
  };

  return { deleteUser, isLoading, isError };
}
