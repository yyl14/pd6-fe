import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const DevelopTeam = lazy(() => import(/* webpackChunkName: "DevelopTeam" */ '@/pages/DevelopTeam'));

export default function TeamRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <DevelopTeam />
    </Suspense>
  );
}
