import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';

import AnnouncementAddRoute from './add';
import AnnouncementEditRoute from './edit';
import AnnouncementSettingRoute from './setting';

const Announcement = lazy(() => import(/* webpackChunkName: "Announcement" */ '@/pages/Announcement'));

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
      <Route exact path="/admin/system/announcement/:announcementId/setting" component={AnnouncementSettingRoute} />
      <Route exact path="/admin/system/announcement/:announcementId/edit" component={AnnouncementEditRoute} />
      <Route exact path="/admin/system/announcement/add" component={AnnouncementAddRoute} />
      <Route exact path="/admin/system/announcement" component={AnnouncementRoute} />
      <Route component={NoMatch} />
    </Switch>
  );
}
