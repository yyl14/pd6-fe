import { Suspense, lazy } from 'react';

const ResetPassword = lazy(() => import('@/pages/ResetPassword'));

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={<></>}>
      <ResetPassword />
    </Suspense>
  );
}
