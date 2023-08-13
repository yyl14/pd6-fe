import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import useVerifyEmail from '@/lib/email/useVerifyEmail';

const EmailVerification = lazy(() => import('@/pages/EmailVerification'));

export default function EmailVerificationRoute() {
  const { verificationCode } = useParams<{ verificationCode: string }>();
  const { isLoading: verifyIsLoading } = useVerifyEmail(verificationCode);
  return (
    <Suspense fallback={<></>}>
      {EmailVerification({
        verificationCode,
        isLoading: verifyIsLoading,
      })}
    </Suspense>
  );
}
