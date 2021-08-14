import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, withRouter, BrowserRouter as Router,
} from 'react-router-dom';

import { Container } from '@material-ui/core';

import Challenge from './challenge';
import Submission from './submission';
import Grade from './grade';
import Team from './team';
import Member from './member';

import NoMatch from '../../../components/noMatch';

import Header from '../../../components/ui/Header';
import Sidebar from '../../../components/ui/Sidebar';

/* This is a level 2 container (role container) */
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.user.classes.length === 0) {
        this.props.history.push('/notFound');
      }
    }
  }

  render() {
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
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {})(withRouter(MyClass));
