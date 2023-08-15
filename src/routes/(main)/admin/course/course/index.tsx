import { Route, Switch } from 'react-router-dom';

import ClassListRoute from './class-list';

export default function CourseRoutes() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course/:courseId/class-list/:addType?" component={ClassListRoute} />
    </Switch>
  );
}
