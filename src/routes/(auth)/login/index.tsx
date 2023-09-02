import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/Login'));

export default function LoginRoute() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <Login />
    </Suspense>
  );
}
