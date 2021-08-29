import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import ChallengeList from '../../../components/normal/myClass/Challenge/ChallengeList';
import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Task from '../../../components/normal/myClass/Challenge/Task';
import Setting from '../../../components/normal/myClass/Challenge/Setting';
import Statistics from '../../../components/normal/myClass/Challenge/Statistics';

import NoMatch from '../../../components/noMatch';
// import EssayProblem from '../../../components/normal/myClass/Challenge/EssayProblem';

/* This is a level 3 container (main page container) */
class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/my-class/:courseId/:classId/challenge" component={ChallengeList} />
          <Route path="/my-class/:courseId/:classId/challenge/:challengeId/setting" component={Setting} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfo} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/statistics" component={Statistics} />
          <Route path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId" component={Task} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, {})(withRouter(Challenge));
