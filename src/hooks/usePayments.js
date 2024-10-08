// hooks/useCreateUser.js
import { useState } from 'react';
import api from 'contexts/Auth-api';
const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/crear_pagos';

export function useCreatePayments() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const createPayment = async (token) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await api.get(endpoint, {
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

  return { createPayment, isLoading, isError };
}
