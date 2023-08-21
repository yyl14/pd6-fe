import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import type { components } from '../../../types/schema';
import { deleteScoreboard, readScoreboard } from './fetchers';

type Scoreboard = Omit<components['schemas']['Scoreboard'], 'data'> & {
  data: {
    id: number;
    scoring_formula: string;
    baseline_team_id: null | number;
    rank_by_total_score: boolean;
    team_label_filter: string;
  };
};

export type ColumnType = {
  id: string;
  label: string;
  align: string;
  width: number;
  type: string;
  minWidth?: number;
  link_id?: string;
};

export type DataType = {
  id: number;
  rank: number;
  team_path: string;
  team_id: number;
  team_name: string;
  total_score: number;
  target_problem_data: { problem_id: number; score: number; submission_id: number }[];
};

const useScoreboard = (scoreboardId: number) => {
  const readScoreboardSWR = useSWR(`/scoreboard/${scoreboardId}`, () =>
    readScoreboard({ scoreboard_id: scoreboardId }),
  );
  const deleteScoreboardSWR = useSWRMutation(`/scoreboard/${scoreboardId}`, () =>
    deleteScoreboard({ scoreboard_id: scoreboardId }),
  );

  return {
    scoreboard: readScoreboardSWR.data?.data.data as Scoreboard, // TODO: type assertion?
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
