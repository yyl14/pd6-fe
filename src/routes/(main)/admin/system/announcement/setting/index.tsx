import { Suspense, lazy } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const AnnouncementSetting = lazy(() => import('@/pages/AnnouncementSetting'));

export default function AnnouncementSettingRoute() {
  const history = useHistory();
  const { announcementId } = useParams<{
    announcementId: string;
  }>();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AnnouncementSetting)({
        announcementId,
        handleEdit: () => history.push(`/6a/admin/system/announcement/${announcementId}/edit`),
      })}
    </Suspense>
  );
}