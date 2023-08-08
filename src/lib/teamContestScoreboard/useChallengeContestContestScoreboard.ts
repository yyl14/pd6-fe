import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addTeamContestScoreboard } from './fetchers';

const useChallengeContestContestScoreboard = () => {
  const addTeamContestScoreboardSWR = useSWRMutation(
    `/challenge/{challenge_id}/team-contest-scoreboard`,
    toSWRMutationFetcher(addTeamContestScoreboard),
  );

  return {
    addTeamContestScoreboard: addTeamContestScoreboardSWR.trigger,

    isLoading: {
      add: addTeamContestScoreboardSWR.isMutating,
    },

    error: {
      add: addTeamContestScoreboardSWR.error,
    },
  };
};

export default useChallengeContestContestScoreboard;
