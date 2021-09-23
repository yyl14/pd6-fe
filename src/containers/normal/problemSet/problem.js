import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProblemList from '../../../components/normal/problemSet/ProblemList';
import ProblemInfo from '../../../components/normal/problemSet/ProblemInfo';
import CodeSubmission from '../../../components/normal/problemSet/CodeSubmission';
import SubmissionList from '../../../components/normal/problemSet/SubmissionList';
import SubmissionDetail from '../../../components/normal/problemSet/SubmissionDetail';
import NoMatch from '../../../components/noMatch';

/* This is a level 3 container (main page container) */
function Problem() {
  return (
    <>
      <Switch>
        <Route exact path="/problem-set/:courseId/:classId" component={ProblemList} />
        <Route exact path="/problem-set/:courseId/:classId/:challengeId/:problemId" component={ProblemInfo} />
        <Route
          exact
          path="/problem-set/:courseId/:classId/:challengeId/:problemId/code-submission"
          component={CodeSubmission}
        />
        <Route
          exact
          path="/problem-set/:courseId/:classId/:challengeId/:problemId/my-submission"
          component={SubmissionList}
        />
        <Route
          exact
          path="/problem-set/:courseId/:classId/:challengeId/:problemId/all-submission/:submissionId"
          component={SubmissionDetail}
        />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}

export default Problem;
