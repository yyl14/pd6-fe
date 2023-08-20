import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { deleteScoreboard, readScoreboard } from './fetchers';

const useScoreboard = (scoreboardId: number) => {
  const readScoreboardSWR = useSWR(`/scoreboard/${scoreboardId}`, () =>
    readScoreboard({ scoreboard_id: scoreboardId }),
  );
  const deleteScoreboardSWR = useSWRMutation(`/scoreboard/${scoreboardId}`, () =>
    deleteScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    scoreboard: readScoreboardSWR.data?.data.data,
    deleteScoreboard: deleteScoreboardSWR.trigger,
    isLoading: {
      read: readScoreboardSWR.isLoading,
      delete: deleteScoreboardSWR.isMutating,
    },
    error: {
      read: readScoreboardSWR.error,
      delete: deleteScoreboardSWR.error,
    },
  };
};

export default useScoreboard;
