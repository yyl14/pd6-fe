import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { deleteScoreboard, readScoreboard } from './fetchers';

type Temp =
  | {
      id: number;
      challenge_id: number;
      challenge_label: string;
      title: string;
      target_problem_ids: number[];
      is_deleted: boolean;
      type: 'TEAM_PROJECT' | 'TEAM_CONTEST';
      data: {
        id: number;
        scoring_formula: string;
        baseline_team_id: null | number;
        rank_by_total_score: boolean;
        team_label_filter: string;
      };
    }
  | undefined;

const useScoreboard = (scoreboardId: number) => {
  const readScoreboardSWR = useSWR(`/scoreboard/${scoreboardId}`, () =>
    readScoreboard({ scoreboard_id: scoreboardId }),
  );
  const deleteScoreboardSWR = useSWRMutation(`/scoreboard/${scoreboardId}`, () =>
    deleteScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    scoreboard: readScoreboardSWR.data?.data.data as Temp, // TODO: type assertion?
    deleteScoreboard: deleteScoreboardSWR.trigger,
    mutateScoreboard: readScoreboardSWR.mutate,

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
