import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { editTeamProjectScoreboard } from './fetchers';

const useTeamProjectScoreboard = (scoreboardId: number) => {
  const editTeamProjectScoreboardSWR = useSWRMutation(
    `/team-project-scoreboard/${scoreboardId}`,
    toSWRFetcher(editTeamProjectScoreboard),
  );
  return {
    editTeamProjectScoreboard: editTeamProjectScoreboardSWR.trigger,

    isLoading: {
      edit: editTeamProjectScoreboardSWR.isMutating,
    },

    error: {
      edit: editTeamProjectScoreboardSWR.error,
    },
  };
};

export default useTeamProjectScoreboard;
