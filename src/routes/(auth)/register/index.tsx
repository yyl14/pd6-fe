import { Suspense, lazy } from 'react';

import FullPageLoading from '@/components/FullPageLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useInstitutes from '@/lib/institute/useInstitutes';

const Register = lazy(() => import(/* webpackChunkName: "Register" */ '@/pages/Register'));

export default function RegisterRoute() {
  const { isLoading: instituteIsLoading } = useInstitutes();
  return (
    <Suspense fallback={<FullPageLoading />}>
      {withConditionalRender(Register)({
        isLoading: instituteIsLoading.browseAll,
      })}
    </Suspense>
  );
}
