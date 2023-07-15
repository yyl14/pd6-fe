import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';
import ChallengeInfo from '../../../components/normal/allClass/Challenge/ChallengeInfo';
import ChallengeList from '../../../components/normal/allClass/Challenge/ChallengeList';
import CodeSubmission from '../../../components/normal/allClass/Challenge/CodeSubmission';
import MySubmission from '../../../components/normal/allClass/Challenge/MySubmission';
import Problem from '../../../components/normal/allClass/Challenge/Problem';
import SubmissionDetail from '../../../components/normal/allClass/Challenge/SubmissionDetail';

import NoMatch from '../../../components/noMatch';

import { fetchClasses } from '../../../actions/admin/course';
import { fetchChallenge, fetchClass, fetchCourse } from '../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../actions/myClass/challenge';

/* This is a level 3 container (main page container) */
function Challenge() {
  const { courseId, classId, challengeId } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (courseId !== undefined) {
      dispatch(fetchClasses(authToken, courseId));
    }
  }, [authToken, courseId, dispatch]);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  useEffect(() => {
    if (challengeId !== undefined) {
      dispatch(fetchChallenge(authToken, challengeId));
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/all-class/:courseId/:classId/challenge" component={ChallengeList} />
        <Route exact path="/all-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfo} />
        <Route exact path="/all-class/:courseId/:classId/challenge/:challengeId/:problemId" component={Problem} />
        <Route
          exact
          path="/all-class/:courseId/:classId/challenge/:challengeId/:problemId/code-submission"
          component={CodeSubmission}
        />
        <Route
          exact
          path="/all-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission"
          component={MySubmission}
        />
        <Route
          exact
          path="/all-class/:courseId/:classId/challenge/:challengeId/:problemId/my-submission/:submissionId"
          component={SubmissionDetail}
        />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}

export default Challenge;
