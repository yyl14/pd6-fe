import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MemberList from '../../../components/admin/course/MemberList';
import ClassSetting from '../../../components/admin/course/ClassSetting';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
export default function ClassInfo() {
  return (
    <>
      <Switch>
        <Route path="/admin/course/class/:courseId/:classId/member" component={MemberList} />
        <Route path="/admin/course/class/:courseId/:classId/setting" component={ClassSetting} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
