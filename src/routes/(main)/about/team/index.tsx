import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const DevelopTeam = lazy(() => import(/* webpackChunkName: "About" */ '@/pages/DevelopTeam'));

export default function TeamRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <DevelopTeam />
    </Suspense>
  );
}
