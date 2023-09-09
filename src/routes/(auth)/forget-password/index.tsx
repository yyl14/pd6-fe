import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';

const ForgetPassword = lazy(() => import(/* webpackChunkName: "ForgetPassword" */ '@/pages/ForgetPassword'));

export default function ForgetPasswordRoute() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <ForgetPassword />
    </Suspense>
  );
}
