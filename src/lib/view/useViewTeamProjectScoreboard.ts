import useSWR from 'swr';

import { viewTeamProjectScoreboard } from './fetchers';

const useViewTeamProjectScoreboard = (scoreboardId: number) => {
  const viewTeamProjectScoreboardSWR = useSWR(`/team-project-scoreboard/view/${scoreboardId}`, () =>
    viewTeamProjectScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    teamProjectScoreboard: viewTeamProjectScoreboardSWR.data?.data.data,

    isLoading: {
      browse: viewTeamProjectScoreboardSWR.isLoading,
    },

    error: {
      browse: viewTeamProjectScoreboardSWR.error,
    },
  };
};

export default useViewTeamProjectScoreboard;
