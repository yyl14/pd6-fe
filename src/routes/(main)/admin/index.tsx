import React from 'react';
import { Route, Switch } from 'react-router-dom';

import useAdminMiddleware from '@/middleware/useAdminMiddleware';

import CoursesRoute from './course';
import ClassRoutes from './course/class';
import SystemRoutes from './system';

export default function AdminRoutes() {
  useAdminMiddleware();

  return (
    <Switch>
      <Route path="/6a/admin/system" component={SystemRoutes} />
      <Route path="/6a/admin/course" component={CoursesRoute} />
      <Route path="/6a/admin/course/class/:courseId/:classId" component={ClassRoutes} />
    </Switch>
  );
}
