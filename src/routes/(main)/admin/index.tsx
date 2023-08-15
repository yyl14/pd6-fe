import { Route, Switch } from 'react-router-dom';

import useAdminMiddleware from '@/middleware/useAdminMiddleware';

import CoursesRoutes from './course';
import ClassRoutes from './course/class';
import CoursesRoute from './course';
import SystemRoutes from './system';

export default function AdminRoutes() {
  useAdminMiddleware();

  return (
    <Switch>
      <Route path="/6a/admin/system" component={SystemRoutes} />
      <Route path="/6a/admin/course" component={CoursesRoute} />
      <Route path="/6a/admin/course/course" component={CoursesRoutes} />
      <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} />
    </Switch>
  );
}
