import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import ClassList from '../../../components/admin/course/ClassList';
import CourseSetting from '../../../components/admin/course/CourseSetting';

import GeneralLoading from '../../../components/GeneralLoading';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
export default function Course() {
  const courses = useSelector((state) => state.courses);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (courses.allIds.length !== 0) {
      if (location.pathname === '/admin/course/course') {
        history.push(`/admin/course/course/${courses.byId[courses.allIds[0]].id}/class-list`);
      }
    }
  }, [courses.allIds, courses.byId, history, location]);

  return (
    <>
      <Switch>
        <Route path="/admin/course/course/:courseId/class-list/:addType?" component={ClassList} />
        <Route path="/admin/course/course/:courseId/setting" component={CourseSetting} />
        <Route exact path="/admin/course/course" component={GeneralLoading} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
