import { Suspense, lazy } from 'react';

const ForgetUsername = lazy(() => import('@/pages/ForgetUsername'));

export default function ForgetUsernameRoute() {
  return (
    <Suspense fallback={<></>}>
      <ForgetUsername />
    </Suspense>
  );
}
