import { Route, Switch } from 'react-router-dom';

import CoursesRoutes from './course';
import ClassRoutes from './course/class';

export default function AdminRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course" component={CoursesRoutes} />
      <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} />
    </Switch>
  );
}
