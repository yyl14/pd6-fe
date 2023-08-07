import useSWRWithBrowseParams from 'swr';
import { viewTeamProjectScoreboard } from './fetchers';

const useViewTeamProjectScoreboard = (scoreboardId: number) => {
  const viewTeamProjectScoreboardSWR = useSWRWithBrowseParams(`/team-project-scoreboard/view/{scoreboard_id}`, () =>
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
