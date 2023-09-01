import { Route, Switch } from 'react-router-dom';

import NoMatch from '@/components/noMatch';

import AccessLogRoute from './access-log';
import AnnouncementRoute from './announcement';
import SubmitLangRoutes from './submission-language';

export default function SystemRoutes() {
  return (
    <Switch>
      <Route path="/admin/system/accesslog" component={AccessLogRoute} />
      <Route path="/admin/system/announcement" component={AnnouncementRoute} />
      <Route path="/admin/system/submitlang" component={SubmitLangRoutes} />
      <Route component={NoMatch} />
    </Switch>
  );
}
