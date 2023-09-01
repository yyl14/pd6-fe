import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const UIComponentUsage = lazy(() => import(/* webpackChunkName: "UIComponentUsage" */ '@/components/UIComponentUsage'));

export default function UIComponentRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      return <UIComponentUsage />
    </Suspense>
  );
}
