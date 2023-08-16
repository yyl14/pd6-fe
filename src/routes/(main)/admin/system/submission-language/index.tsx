import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const SubmitLang = lazy(() => import('@/pages/SubmitLang'));

export default function SubmitLangRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <SubmitLang />
    </Suspense>
  );
}
