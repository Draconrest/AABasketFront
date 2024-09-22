import { useLazyFetch } from 'hooks/useFetch';

//const endpoint = import.meta.env.VITE_PUBLIC_HOST_ENDPOINT + '/users'; //!backend endpoint
//!Cambiar por el endpoint de la API
const mockEndpoint = 'https://jsonplaceholder.typicode.com/todos';
export function useLazyUsers(token, params) {
  return useLazyFetch(mockEndpoint, token, params);
}
