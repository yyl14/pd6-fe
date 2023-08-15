import { Suspense, lazy } from 'react';

import withConditionalRender from '@/components/hoc/withConditionalRender';
import useInstitutes from '@/lib/institute/useInstitutes';

const Register = lazy(() => import('@/pages/Register'));

export default function RegisterRoute() {
  const { isLoading: instituteIsLoading } = useInstitutes();
  return (
    <Suspense fallback={<></>}>
      {withConditionalRender(Register)({
        isLoading: instituteIsLoading.browseAll,
      })}
    </Suspense>
  );
}
