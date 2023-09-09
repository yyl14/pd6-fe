import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const AccessLog = lazy(() => import(/* webpackChunkName: "AccessLog" */ '@/pages/AccessLog'));

export default function AccessLogRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <AccessLog />
    </Suspense>
  );
}
