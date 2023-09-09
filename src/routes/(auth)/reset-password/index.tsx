import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';

const ResetPassword = lazy(() => import(/* webpackChunkName: "ResetPassword" */ '@/pages/ResetPassword'));

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <ResetPassword />
    </Suspense>
  );
}
