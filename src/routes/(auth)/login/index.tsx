import { Suspense, lazy } from 'react';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/Login'));

export default function LoginRoute() {
  return (
    <Suspense fallback={<></>}>
      <Login />
    </Suspense>
  );
}
