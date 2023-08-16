import { Route, Switch } from 'react-router-dom';

import AccessLogRoute from './access-log';
import AnnouncementRoute from './announcement';
import SubmitLangRoute from './submission-language';

export default function SystemRoutes() {
  return (
    <Switch>
      <Route path="/6a/admin/system/accesslog" component={AccessLogRoute} />
      <Route path="/6a/admin/system/announcement" component={AnnouncementRoute} />
      <Route path="/6a/admin/system/submitlang" component={SubmitLangRoute} />
    </Switch>
  );
}
