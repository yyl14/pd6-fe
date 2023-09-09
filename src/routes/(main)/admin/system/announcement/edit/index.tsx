import { Suspense, lazy } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const AnnouncementEdit = lazy(() => import(/* webpackChunkName: "AnnouncementEdit" */ '@/pages/AnnouncementEdit'));

export default function AnnouncementEditRoute() {
  const history = useHistory();
  const { announcementId } = useParams<{
    announcementId: string;
  }>();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AnnouncementEdit)({
        announcementId,
        handleDoneEditing: () => history.push(`/admin/system/announcement/${announcementId}/setting`),
        newAnnouncement: false,
      })}
    </Suspense>
  );
}
