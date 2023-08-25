import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { editTeamContestScoreboard } from './fetchers';

const useTeamContestScoreboard = (scoreboardId: number) => {
  const editTeamContestScoreboardSWR = useSWRMutation(
    `/team-contest-scoreboard/${scoreboardId}`,
    toSWRFetcher(editTeamContestScoreboard),
  );

  return {
    editTeamContestScoreboard: editTeamContestScoreboardSWR.trigger,

    isLoading: {
      edit: editTeamContestScoreboardSWR.isMutating,
    },
    error: {
      edit: editTeamContestScoreboardSWR.error,
    },
  };
};

export default useTeamContestScoreboard;
