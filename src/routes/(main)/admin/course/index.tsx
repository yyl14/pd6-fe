import { Route, Switch } from 'react-router-dom';

import ClassRoutes from './class';
<<<<<<< HEAD
import CourseRoute from './course';
=======
import CourseRoutes from './course';
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a

export default function CourseAndClassRoutes() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route path="/6a/admin/course/course" component={CourseRoute} />
      <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} />
=======
      <Route path="/6a/admin/course/class" component={ClassRoutes} />
      <Route path="/6a/admin/course/course" component={CourseRoutes} />
>>>>>>> 6e3b79d83be11c3935761ddef6277899e0ca6d2a
    </Switch>
  );
}
