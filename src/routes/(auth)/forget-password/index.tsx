import { Suspense, lazy } from 'react';

const ForgetPassword = lazy(() => import('@/pages/ForgetPassword'));

export default function ForgetPasswordRoute() {
  return (
    <Suspense fallback={<></>}>
      <ForgetPassword />
    </Suspense>
  );
}
