import { Suspense, lazy, useMemo } from 'react';

import useQuery from '@/hooks/useQuery';

const EmailVerification = lazy(() => import('@/pages/EmailVerification'));

export default function EmailVerificationRoute() {
  const query = useQuery();
  const verificationCode = useMemo(() => query.get('code') as string, [query]);
  return (
    <Suspense fallback={<></>}>
      <EmailVerification verificationCode={verificationCode} />
    </Suspense>
  );
}
