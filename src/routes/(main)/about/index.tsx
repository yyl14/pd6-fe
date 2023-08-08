import { Suspense, lazy } from 'react';
import GeneralLoading from '../../../components/GeneralLoading';

const About = lazy(() => import(/* webpackChunkName: "About" */ '../../../pages/About'));

export default function AboutRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <About />
    </Suspense>
  );
}
