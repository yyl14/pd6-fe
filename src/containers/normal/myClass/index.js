import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Switch, Route, useParams, useHistory,
} from 'react-router-dom';

import Challenge from './challenge';
import Submission from './submission';
import Grade from './grade';
import Team from './team';
import Member from './member';

import NoMatch from '../../../components/noMatch';

/* This is a level 2 container (role container) */
export default function MyClass() {
  const history = useHistory();
  const { classId } = useParams();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const inClass = user.classes.reduce((acc, item) => acc || item.class_id === Number(classId), false);
      if (!inClass) {
        history.push('/notFound');
      }
    }

    if (user.classes.length !== 0 && user.classes[0].course_id === undefined) {
      history.go(0);
    }
  }, [auth.isAuthenticated, classId, history, user.classes]);

  return (
    <Switch>
      <Route path="/my-class/:courseId/:classId/challenge" component={Challenge} />
      <Route path="/my-class/:courseId/:classId/submission" component={Submission} />
      <Route path="/my-class/:courseId/:classId/grade" component={Grade} />
      <Route path="/my-class/:courseId/:classId/team" component={Team} />
      <Route path="/my-class/:courseId/:classId/member" component={Member} />
      <Route component={NoMatch} />
    </Switch>
  );
}
