import { useLazyFetch } from 'hooks/useFetch';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/pagos'; //!backend endpoint

export function useLazyBills(token, params) {
  return useLazyFetch(endpoint, token, params);
}
