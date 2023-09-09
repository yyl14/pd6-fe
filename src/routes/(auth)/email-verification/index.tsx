import { Suspense, lazy, useMemo } from 'react';

import FullPageLoading from '@/components/FullPageLoading';
import useQuery from '@/hooks/useQuery';

const EmailVerification = lazy(() => import(/* webpackChunkName: "EmailVerification" */ '@/pages/EmailVerification'));

export default function EmailVerificationRoute() {
  const [query] = useQuery();
  const verificationCode = useMemo(() => query.get('code') as string, [query]);
  return (
    <Suspense fallback={<FullPageLoading />}>
      <EmailVerification verificationCode={verificationCode} />
    </Suspense>
  );
}
