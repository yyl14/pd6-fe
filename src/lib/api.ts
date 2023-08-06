import { Fetcher, Middleware } from 'openapi-typescript-fetch';

import { paths } from '../../types/schema';
import useAuthStore from '../stores/authStore';

const logger: Middleware = async (url, init, next) => {
  // eslint-disable-next-line no-console
  console.log(`fetching ${url}`);
  const res = await next(url, init);
  // eslint-disable-next-line no-console
  console.log(`fetched ${url}`);
  return res;
};

const authTokenInjector: Middleware = async (url, init, next) => {
  const token = useAuthStore.getState().authToken;
  if (token) {
    init.headers.set('auth-token', token);
  }
  const res = await next(url, init);
  return res;
};

const interceptUndefinedParams: Middleware = async (url, init, next) => {
  if (url.includes('undefined')) {
    // eslint-disable-next-line no-console
    console.log('Requesting url contains "undefined".');
    throw new Error('Requesting url contains "undefined".');
  }
  const res = await next(url, init);
  return res;
};

const fetchError: Middleware = async (url, init, next) => {
  const res = await next(url, init);
  if (!res.data.success) throw new Error(res.data.error);
  return res;
};

const tokenExpirationHandler: Middleware = async (url, init, next) => {
  const res = await next(url, init);
  if (!res.ok && res.data.error.toString() === 'LoginExpired') {
    useAuthStore.getState().clear();
  }
  return res;
};

const api = Fetcher.for<paths>();

api.configure({
  baseUrl: process.env.REACT_APP_API_ROOT,
  use: [interceptUndefinedParams, logger, authTokenInjector, fetchError, tokenExpirationHandler],
});

export default api;
