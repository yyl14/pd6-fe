import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import SubmissionList from '../../../components/normal/myClass/Submission/SubmissionList';
import SubmissionDetail from '../../../components/normal/myClass/Submission/SubmissionDetail';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: if this user is not a TA in this class, push to 404 (no match)
  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/my-class/:courseId/:classId/submission" component={SubmissionList} />
          <Route path="/my-class/:courseId/:classId/submission/:submissionId" component={SubmissionDetail} />
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

export default connect(mapStateToProps, {})(withRouter(Submission));
