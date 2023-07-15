import { Fetcher, Middleware } from 'openapi-typescript-fetch';
import { paths } from '../../types/schema';

const logger: Middleware = async (url, init, next) => {
  // eslint-disable-next-line no-console
  console.log(`fetching ${url}`);
  const res = await next(url, init);
  // eslint-disable-next-line no-console
  console.log(`fetched ${url}`);
  return res;
};

// const authTokenInjector: Middleware = async (url, init, next) => {
//   const session = await getSession();
//   if (session?.token) {
//     init.headers.set('auth-token', session.token);
//   }
//   const res = await next(url, init);
//   return res;
// };

// const tokenExpirationHandler: Middleware = async (url, init, next) => {
//   const res = await next(url, init);
//   if (!res.ok && res.data.error.toString() === 'LoginExpired') {
//     signOut();
//   }
//   return res;
// };

const api = Fetcher.for<paths>();

api.configure({
  baseUrl: process.env.NEXT_PUBLIC_API_ROOT,
  // use: [logger, authTokenInjector, tokenExpirationHandler],
  use: [logger],
});

export default api;
