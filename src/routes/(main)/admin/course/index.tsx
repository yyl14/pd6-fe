import { Route, Switch } from 'react-router-dom';

import CourseRoute from '@/routes/(main)/admin/course/course';

export default function CoursesRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course" component={CourseRoute} />
      {/* <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} /> */}
      <Route path="/6a/admin/course/course/:courseId" component={CourseRoutes} />
    </Switch>
  );
}
