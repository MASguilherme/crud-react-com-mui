import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {

  if (error.message === 'network error') {
    return Promise.reject(new Error('Erro de conexão'));
  }

  if (error.response?.status === 401) {
    // do something
  }

  return Promise.reject(error);
};