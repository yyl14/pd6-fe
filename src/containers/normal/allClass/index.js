import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, withRouter, BrowserRouter as Router,
} from 'react-router-dom';

import { Container } from '@material-ui/core';

import Challenge from './challenge';

import NoMatch from '../../../components/noMatch';

import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';

/* This is a level 2 container (role container) */
function AllClass() {
  return (
    <Switch>
      <Route path="/all-class/:courseId/:classId/challenge" component={Challenge} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default AllClass;
