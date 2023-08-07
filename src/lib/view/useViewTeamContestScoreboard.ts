import useSWRWithBrowseParams from 'swr';
import { viewTeamContestScoreboard } from './fetchers';

const useViewTeamContestScoreboard = (scoreboardId: number) => {
  const viewTeamContestScoreboardSWR = useSWRWithBrowseParams(`/team-contest-scoreboard/view/{scoreboard_id}`, () =>
    viewTeamContestScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    teamContestScoreboard: viewTeamContestScoreboardSWR.data?.data.data,

    isLoading: {
      browse: viewTeamContestScoreboardSWR.isLoading,
    },

    error: {
      browse: viewTeamContestScoreboardSWR.error,
    },
  };
};

export default useViewTeamContestScoreboard;
