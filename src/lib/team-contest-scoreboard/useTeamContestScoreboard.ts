import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { editTeamContestScoreboard, viewTeamContestScoreboard } from './fetchers';

const useTeamContestScoreboard = (scoreboardId: number) => {
  const viewTeamContestScoreboardSWR = useSWR(`/team-contest-scoreboard/view/${scoreboardId}`, () =>
    viewTeamContestScoreboard({ scoreboard_id: scoreboardId }),
  );

  const editTeamContestScoreboardSWR = useSWRMutation(
    `/team-contest-scoreboard/${scoreboardId}`,
    toSWRFetcher(editTeamContestScoreboard),
  );

  return {
    viewTeamContestScoreboard: viewTeamContestScoreboardSWR.data?.data.data,
    editTeamContestScoreboard: editTeamContestScoreboardSWR.trigger,

    isLoading: {
      view: viewTeamContestScoreboardSWR.isLoading,
      edit: editTeamContestScoreboardSWR.isMutating,
    },
    error: {
      view: viewTeamContestScoreboardSWR.error,
      edit: editTeamContestScoreboardSWR.error,
    },
  };
};

export default useTeamContestScoreboard;
