import { Fetcher, Middleware } from 'openapi-typescript-fetch';

import useAuthStore from '@/stores/authStore';

import { paths } from '../../types/schema';

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
    console.log('Requesting url contains "undefined".', url);
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

type Response = {
  success: boolean;
  error: string;
  data: unknown;
};

interface RequestOption extends RequestInit {
  params?: Record<string, string>;
}

export async function fetchAPI(endpoint: string, options: RequestOption): Promise<Response> {
  const token = useAuthStore.getState().authToken;

  if (!token) {
    useAuthStore.getState().clear();
    throw new Error('No token found');
  }

  const headers = {
    'auth-token': token,
  };

  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  };

  const baseUrl = process.env.REACT_APP_API_ROOT;
  let url = baseUrl + endpoint;
  if (options.params) {
    const params = new URLSearchParams(options.params);
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, fetchOptions);
  const data = await res.json();

  if (!res.ok) {
    if (data.error?.toString() === 'LoginExpired') {
      useAuthStore.getState().clear();
    }
    throw new Error(data.error);
  }

  return data;
}
