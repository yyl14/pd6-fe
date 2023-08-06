import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { editTeamProjectScoreboard, viewTeamProjectScoreboard } from './fetchers';

const useTeamProjectScoreboard = (scoreboardId: number) => {
  const editTeamProjectScoreboardSWR = useSWRMutation(
    `/team-project-scoreboard/${scoreboardId}`,
    toSWRFetcher(editTeamProjectScoreboard),
  );
  const viewTeamProjectScoreboardSWR = useSWR(`/team-project-scoreboard/view/${scoreboardId}`, () =>
    viewTeamProjectScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    editTeamProjectScoreboard: editTeamProjectScoreboardSWR.trigger,
    viewTeamProjectScoreboard: viewTeamProjectScoreboardSWR.data?.data.data,

    isLoading: {
      edit: editTeamProjectScoreboardSWR.isMutating,
      view: viewTeamProjectScoreboardSWR.isLoading,
    },

    error: {
      edit: editTeamProjectScoreboardSWR.error,
      view: viewTeamProjectScoreboardSWR.error,
    },
  };
};

export default useTeamProjectScoreboard;
