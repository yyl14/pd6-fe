import { Suspense, lazy } from 'react';

const Register = lazy(() => import('@/pages/Register'));

export default function RegisterRoute() {
  return (
    <Suspense fallback={<></>}>
      <Register />
    </Suspense>
  );
}
