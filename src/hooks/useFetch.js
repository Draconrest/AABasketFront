// hooks/useFetch.js
import useSWR from 'swr';
import axios from 'axios';

const fetcher = async (url, token) => {
  const { endpoint, params } = url;
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const fullUrl = `${endpoint}${queryString}`;

  try {
    const response = await axios.get(fullUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export function useLazyFetch(endpoint, params = {}, token = null) {
  const { data, error, mutate } = useSWR({ endpoint, params }, (url) => fetcher(url, token), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.message || null, //! Devolver el mensaje del error para manejarlo en el frontend
    mutate
  };
}
