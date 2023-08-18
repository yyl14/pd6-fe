import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';

const Announcement = lazy(() => import('@/pages/Announcement'));

export default function AnnouncementRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <Announcement />
    </Suspense>
  );
}
