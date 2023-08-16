import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const AccessLog = lazy(() => import('@/pages/AccessLog'));

export default function AccessLogRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <AccessLog />
    </Suspense>
  );
}
