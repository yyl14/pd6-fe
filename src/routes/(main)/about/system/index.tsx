import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const SystemInfo = lazy(() => import(/* webpackChunkName: "SystemInfo" */ '@/pages/SystemInfo'));

export default function SystemRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <SystemInfo />
    </Suspense>
  );
}
