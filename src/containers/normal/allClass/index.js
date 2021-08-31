import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Challenge from './challenge';
import PlaceHolder from './placeHolder';

import NoMatch from '../../../components/noMatch';

/* This is a level 2 container (role container) */
function AllClass() {
  return (
    <Switch>
      <Route exact path="/all-class" component={PlaceHolder} />
      <Route exact path="/all-class/:courseId" component={PlaceHolder} />
      <Route path="/all-class/:courseId/:classId/challenge" component={Challenge} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default AllClass;
