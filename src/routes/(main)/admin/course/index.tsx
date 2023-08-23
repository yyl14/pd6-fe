import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourseRoute from './course';

export default function CoursesRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course" component={CourseRoute} />
    </Switch>
  );
}
