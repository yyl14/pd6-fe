import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';

const ResetPassword = lazy(() => import('@/pages/ResetPassword'));

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <ResetPassword />
    </Suspense>
  );
}
