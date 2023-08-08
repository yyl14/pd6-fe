import { lazy, Suspense } from 'react';
import GeneralLoading from '../../../components/GeneralLoading';

const UIComponentUsage = lazy(
  () => import(/* webpackChunkName: "UIComponentUsage" */ '../../../components/ui/UIComponentUsage'),
);

export default function UIComponentRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      return <UIComponentUsage />
    </Suspense>
  );
}
