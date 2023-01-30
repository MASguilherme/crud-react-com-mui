import axios from 'axios';

import { responseInterceptor, errorInterceptor } from './interceptor';
import { Environment } from '../../../environment';

const { URL_BASE } = Environment;

const Api = axios.create({
  baseURL: URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };