import { useState } from 'react';
import api from 'contexts/Auth-api';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/pagos/pago_pendiente';

export function useConfirmeBill() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const confirmeBill = async (billData, token) => {
    const confirmeEndpoint = `${endpoint}/${billData.id}`;
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await api.put(confirmeEndpoint, billData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(error.response?.data || 'Error al confirmar el pago');
      setIsLoading(false);
      throw error;
    }
  };

  return { confirmeBill, isLoading, isError };
}
