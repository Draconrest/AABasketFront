// hooks/useCreateUser.js
import { useState } from 'react';
import axios from 'axios';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/send-notifications';

export function useSendNotification() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const sendNotification = async (token) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(error.response?.data || 'Error al enviar notificaciones');
      setIsLoading(false);
      throw error;
    }
  };

  return { sendNotification, isLoading, isError };
}
