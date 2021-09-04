import React, { useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Task from '../../../components/normal/myClass/Challenge/Task';
import Setting from '../../../components/normal/myClass/Challenge/Setting';
import Statistics from '../../../components/normal/myClass/Challenge/Statistics';
import { fetchChallenge } from '../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../actions/myClass/challenge';

import NoMatch from '../../../components/noMatch';
// import EssayProblem from '../../../components/normal/myClass/Challenge/EssayProblem';

/* This is a level 3 container (main page container) */
export default function Challenge() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const { challengeId } = useParams();

  useEffect(() => {
    dispatch(fetchChallenge(authToken, challengeId));
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfo} />
        <Route path="/my-class/:courseId/:classId/challenge/:challengeId/setting" component={Setting} />
        <Route path="/my-class/:courseId/:classId/challenge/:challengeId/statistics" component={Statistics} />
        <Route path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId" component={Task} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
