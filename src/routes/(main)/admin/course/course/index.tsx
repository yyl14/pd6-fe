import { Route, Switch } from 'react-router-dom';

import CourseSettingRoute from '@/routes/(main)/admin/course/course/setting';

export default function CourseRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course/:courseId/setting" component={CourseSettingRoute} />
    </Switch>
  );
}
