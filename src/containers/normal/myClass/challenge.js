import React, { useEffect } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Task from '../../../components/normal/myClass/Challenge/Task';
import Setting from '../../../components/normal/myClass/Challenge/Setting';
import Statistics from '../../../components/normal/myClass/Challenge/Statistics';
import { fetchChallenge } from '../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../actions/myClass/challenge';

import GeneralLoading from '../../../components/GeneralLoading';
import NoMatch from '../../../components/noMatch';
// import EssayProblem from '../../../components/normal/myClass/Challenge/EssayProblem';

/* This is a level 3 container (main page container) */
export default function Challenge() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const { challengeId } = useParams();
  const challenges = useSelector((state) => state.challenges.byId);
  const loading = useSelector((state) => state.loading.myClass);
  const commonLoading = useSelector((state) => state.loading.common.common);

  useEffect(() => {
    if (
      !loading.challenge.addChallenge
      && !loading.challenge.editChallenge
      && !loading.challenge.deleteChallenge
      && !loading.challenge.addProblem
      && !loading.challenge.addEssay
      && !loading.challenge.addPeerReview
      && !loading.problem.deleteProblem
      && !loading.problem.deleteEssay
      // && !loading.problem.deletePeerReview
    ) {
      dispatch(fetchChallenge(authToken, challengeId));
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }
  }, [
    authToken,
    challengeId,
    dispatch,
    loading.challenge.addChallenge,
    loading.challenge.addEssay,
    loading.challenge.addPeerReview,
    loading.challenge.addProblem,
    loading.challenge.deleteChallenge,
    loading.challenge.editChallenge,
    loading.problem.deleteEssay,
    loading.problem.deleteProblem,
  ]);

  if (challenges[challengeId] === undefined) {
    if (commonLoading.fetchChallenge) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

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
