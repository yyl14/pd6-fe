import { Route, Switch } from 'react-router-dom';

import CourseRoutes from './course';

export default function CoursesRoutes() {
  return (
    <Switch>
      {/* <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} /> */}
      <Route path="/6a/admin/course/course/:courseId" component={CourseRoutes} />
    </Switch>
  );
}
