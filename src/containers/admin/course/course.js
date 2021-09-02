import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ClassList from '../../../components/admin/course/ClassList';
import CourseSetting from '../../../components/admin/course/CourseSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
export default function Course() {
  return (
    <>
      <Switch>
        <Route path="/admin/course/course/:courseId/class-list/:addType?" component={ClassList} />
        <Route path="/admin/course/course/:courseId/setting" component={CourseSetting} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
