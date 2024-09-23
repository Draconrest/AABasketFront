import { useLazyFetch } from 'hooks/useFetch';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users'; //!backend endpoint

export function useLazyUsers(token, params) {
  return useLazyFetch(endpoint, token, params);
}
