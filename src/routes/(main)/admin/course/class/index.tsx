import { Route, Switch } from 'react-router-dom';

import ClassMemberListRoute from './member';
import ClassSettingRoute from './setting';

export default function ClassRoutes() {
  return (
    <Switch>
      <Route path="/6a/admin/course/class/:courseId/:classId/member" component={ClassMemberListRoute} />
      <Route path="/6a/admin/course/class/:courseId/:classId/setting" component={ClassSettingRoute} />
    </Switch>
  );
}
