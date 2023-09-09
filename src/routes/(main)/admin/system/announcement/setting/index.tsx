import { Suspense, lazy } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useAnnouncement from '@/lib/announcement/useAnnouncement';

const AnnouncementSetting = lazy(
  () => import(/* webpackChunkName: "AnnouncementSetting" */ '@/pages/AnnouncementSetting'),
);

export default function AnnouncementSettingRoute() {
  const history = useHistory();
  const { announcementId } = useParams<{
    announcementId: string;
  }>();

  const { isLoading: announcementIsLoading } = useAnnouncement(Number(announcementId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AnnouncementSetting)({
        announcementId,
        handleEdit: () => history.push(`/admin/system/announcement/${announcementId}/edit`),
        isLoading: announcementIsLoading.read,
      })}
    </Suspense>
  );
}
