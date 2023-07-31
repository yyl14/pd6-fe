import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams } from 'react-router-dom';

import { fetchChallenge } from '../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../actions/myClass/challenge'; 
import ChallengeInfo from '../../../components/normal/myClass/Challenge/ChallengeInfo';
import Setting from '../../../components/normal/myClass/Challenge/Setting';
import Statistics from '../../../components/normal/myClass/Challenge/Statistics';
import Task from '../../../components/normal/myClass/Challenge/Task';
import NoMatch from '../../../components/noMatch';
import useChallengeTasks from '../../../lib/task/useChallengeTasks';
// import EssayProblem from '../../../components/normal/myClass/Challenge/EssayProblem';

/* This is a level 3 container (main page container) */
export default function Challenge() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const { challengeId } = useParams();
  const loading = useSelector((state) => state.loading.myClass);
  const apiLoading = useSelector((state) => state.loading.api);
  const { isLoading: ChallengeTasksLoading } = useChallengeTasks(challengeId);
  
  useEffect(() => {
    if (
      !loading.challenge.addChallenge &&
      !loading.challenge.editChallenge &&
      !loading.challenge.deleteChallenge &&
      !ChallengeTasksLoading.addProblem &&
      !ChallengeTasksLoading.addEssay &&
      !ChallengeTasksLoading.addPeerReview &&
      !loading.problem.deleteProblem &&
      !loading.problem.deleteEssay &&
      !apiLoading.scoreboard.deleteScoreboard
      // && !loading.problem.deletePeerReview
    ) {
      dispatch(fetchChallenge(authToken, challengeId)); 
      dispatch(browseTasksUnderChallenge(authToken, challengeId)); 
    }
  }, [
    apiLoading.scoreboard.deleteScoreboard,
    authToken,
    challengeId,
    dispatch,
    loading.challenge.addChallenge,
    ChallengeTasksLoading.addEssay,
    ChallengeTasksLoading.addPeerReview,
    ChallengeTasksLoading.addProblem,
    loading.challenge.deleteChallenge,
    loading.challenge.editChallenge,
    loading.problem.deleteEssay,
    loading.problem.deleteProblem,
  ]);
  
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