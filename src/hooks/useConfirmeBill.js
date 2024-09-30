import { useState } from 'react';
import axios from 'axios';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/pagos/pago_pendiente';

export function useConfirmeBill() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const confirmeBill = async (billData) => {
    const confirmeEndpoint = `${endpoint}/${billData.id}`;
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await axios.put(confirmeEndpoint, billData);
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
