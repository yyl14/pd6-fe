import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const IconUsage = lazy(() => import(/* webpackChunkName: "IconUsage" */ '@/components/IconUsage'));

export default function IconRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <IconUsage />
    </Suspense>
  );
}
