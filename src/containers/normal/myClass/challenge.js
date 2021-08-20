import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import ChallengeList from '../../../components/normal/myClass/Challenge/ChallengeList';
import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Problem from '../../../components/normal/myClass/Challenge/Problem';
import Statistics from '../../../components/normal/myClass/Challenge/Statistics';
import CodeSubmission from '../../../components/normal/myClass/Challenge/CodeSubmission';
import SubmissionList from '../../../components/normal/myClass/Challenge/SubmissionList';
import SubmissionDetail from '../../../components/normal/myClass/Challenge/SubmissionDetail';
import NoMatch from '../../../components/noMatch';

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
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfo} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/statistics" component={Statistics} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId" component={Problem} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/code-submission" component={CodeSubmission} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission" component={SubmissionList} />
          <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission/:submissionId" component={SubmissionDetail} />
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
