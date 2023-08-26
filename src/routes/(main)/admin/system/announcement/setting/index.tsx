import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const AnnouncementSetting = lazy(() => import('@/pages/AnnouncementSetting'));

export default function AnnouncementSettingRoute() {
  const { announcementId } = useParams<{
    announcementId: string;
  }>();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AnnouncementSetting)({
        announcementId,
      })}
    </Suspense>
  );
}
