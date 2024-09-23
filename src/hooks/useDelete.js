// hooks/useCreateUser.js
import { useState } from 'react';
import axios from 'axios';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users';

export function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const deleteUser = async (userId) => {
    const deleteEndpoint = `${endpoint}/${userId}`;
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.delete(deleteEndpoint, userId);
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
