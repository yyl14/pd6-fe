import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Problem from './problem';
import PlaceHolder from './placeHolder';

import NoMatch from '../../../components/noMatch';

/* This is a level 2 container (role container) */
function ProblemSet() {
  return (
    <Switch>
      <Route exact path="/problem-set" component={PlaceHolder} />
      <Route exact path="/problem-set/:courseId" component={PlaceHolder} />
      <Route path="/problem-set/:courseId/:classId" component={Problem} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default ProblemSet;
