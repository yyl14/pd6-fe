import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addTeamProjectScoreboard } from './fetchers';

const useChallengeContestContestScoreboard = (challengeId: number) => {
  const addTeamProjectScoreboardSWR = useSWRMutation(
    `/challenge/{challenge_id}/team-project-scoreboard`,
    toSWRMutationFetcher(addTeamProjectScoreboard),
  );

  return {
    addTeamProjectScoreboard: addTeamProjectScoreboardSWR.trigger,

    isLoading: {
      add: addTeamProjectScoreboardSWR.isMutating,
    },
    error: {
      add: addTeamProjectScoreboardSWR.error,
    },
  };
};

export default useChallengeContestContestScoreboard;
