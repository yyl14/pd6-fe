import { Route, Switch } from 'react-router-dom';

import ClassRoutes from './class';
import CourseRoute from './course';

export default function CoursesRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course" component={CourseRoute} />
      <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} />
    </Switch>
  );
}
