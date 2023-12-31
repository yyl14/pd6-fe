import { Route, Switch } from 'react-router-dom';

import ClassListRoute from './class-list';
import CourseSettingRoute from './setting';

export default function CourseRoutes() {
  return (
    <Switch>
      <Route path="/admin/course/course/:courseId/class-list/:addType?" component={ClassListRoute} />
      <Route path="/admin/course/course/:courseId/setting" component={CourseSettingRoute} />
    </Switch>
  );
}
