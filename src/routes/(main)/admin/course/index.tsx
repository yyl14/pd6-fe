import { Route, Switch } from 'react-router-dom';

import useAdminCourseMiddleware from '@/middleware/useAdminCourseMiddleware';

import ClassRoutes from './class';
import CourseRoutes from './course';

export default function CourseAndClassRoutes() {
  useAdminCourseMiddleware();

  return (
    <Switch>
      <Route path="/6a/admin/course/class" component={ClassRoutes} />
      <Route path="/6a/admin/course/course" component={CourseRoutes} />
    </Switch>
  );
}
