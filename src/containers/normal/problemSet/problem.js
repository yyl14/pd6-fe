import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch, Route, useParams,
} from 'react-router-dom';
// import Problem from '../../../components/normal/allClass/Challenge/Problem';
import ProblemList from '../../../components/normal/problemSet/ProblemList';
import ProblemInfo from '../../../components/normal/problemSet/ProblemInfo';
import CodeSubmission from '../../../components/normal/problemSet/CodeSubmission';
import SubmissionList from '../../../components/normal/problemSet/SubmissionList';
import SubmissionDetail from '../../../components/normal/problemSet/SubmissionDetail';
import NoMatch from '../../../components/noMatch';

import { fetchCourse, fetchClass } from '../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../actions/myClass/problem';

/* This is a level 3 container (main page container) */
function Problem() {
  const { courseId, classId, challengeId } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  useEffect(() => {
    if (challengeId !== undefined) {
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch]);

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
