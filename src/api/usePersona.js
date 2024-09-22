import { useLazyFetch } from 'hooks/useFetch';

const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/persona';

export function useLazyPersona(token, shouldFetch) {
  return useLazyFetch(endpoint, token, {}, shouldFetch);
}
