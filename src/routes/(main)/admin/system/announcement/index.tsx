import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';

import AnnouncementAddRoute from './add';
import AnnouncementSettingRoute from './setting';

const Announcement = lazy(() => import('@/pages/Announcement'));

function AnnouncementRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <Announcement />
    </Suspense>
  );
}

export default function AnnouncementRoutes() {
  return (
    <Switch>
      <Route exact path="/6a/admin/system/announcement/:announcementId/setting" component={AnnouncementSettingRoute} />
      <Route exact path="/6a/admin/system/announcement/add" component={AnnouncementAddRoute} />
      <Route exact path="/admin/system/announcement" component={AnnouncementRoute} />
    </Switch>
  );
}