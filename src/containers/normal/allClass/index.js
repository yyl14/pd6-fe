import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Challenge from './challenge';
import ChallengeList from '../../../components/normal/allClass/Challenge/ChallengeList';
import PlaceHolder from './placeHolder';

import NoMatch from '../../../components/noMatch';

/* This is a level 2 container (role container) */
function AllClass() {
  return (
    <Switch>
      <Route exact path="/all-class" component={PlaceHolder} />
      <Route exact path="/all-class/:courseId" component={PlaceHolder} />
      <Route exact path="/all-class/:courseId/:classId/challenge" component={ChallengeList} />
      <Route path="/all-class/:courseId/:classId/challenge/:challengeId" component={Challenge} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default AllClass;
