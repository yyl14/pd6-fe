import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';

const ForgetUsername = lazy(() => import('@/pages/ForgetUsername'));

export default function ForgetUsernameRoute() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <ForgetUsername />
    </Suspense>
  );
}
