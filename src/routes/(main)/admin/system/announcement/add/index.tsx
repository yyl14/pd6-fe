import { Suspense, lazy } from 'react';
import { useHistory } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const AnnouncementEdit = lazy(() => import('@/pages/AnnouncementEdit'));

export default function AnnouncementAddRoute() {
  const history = useHistory();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AnnouncementEdit)({
        announcementId: null,
        handleDoneEditing: () => {
          history.push('/6a/admin/system/announcement');
        },
        newAnnouncement: true,
      })}
    </Suspense>
  );
}
