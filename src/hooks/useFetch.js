import useSWR from 'swr';
import api from 'contexts/Auth-api';
export const fetcher = async (url) => {
  const { endpoint, params } = url;
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  const fullUrl = `${endpoint}${queryString}`;

  const response = await api.get(fullUrl); // `api` already attaches token
  return response.data;
};

export function useLazyFetch(endpoint, params = {}) {
  const { data, error, mutate } = useSWR({ endpoint, params }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.message || null,
    mutate
  };
}
