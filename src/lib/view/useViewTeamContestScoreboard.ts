import useSWR from 'swr';

import { viewTeamContestScoreboard } from './fetchers';

const useViewTeamContestScoreboard = (scoreboardId: number) => {
  const viewTeamContestScoreboardSWR = useSWR(`/team-contest-scoreboard/view/${scoreboardId}`, () =>
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
