import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ClassListRoute from './class-list';
import CourseSettingRoute from './setting';

export default function CourseRoute() {
  return (
    <Switch>
      <Route path="/6a/admin/course/course/:courseId/class-list/:addType?" component={ClassListRoute} />
      <Route path="/6a/admin/course/course/:courseId/setting" component={CourseSettingRoute} />
    </Switch>
  );
}
