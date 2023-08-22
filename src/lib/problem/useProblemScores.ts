import { useCallback } from 'react';

import { readProblemScore } from './fetchers';

const useProblemScores = () => {
  const readProblemScoreByIds = useCallback(
    async (problemIds: number[]) =>
      Promise.all(
        problemIds.map(async (problem_id) => {
          try {
            const item = await readProblemScore({ problem_id });
            return { id: problem_id, score: item.data.data.score };
          } catch {
            return { id: problem_id, score: null };
          }
        }),
      ),
    [],
  );

  return {
    readProblemScoreByIds,
  };
};

export default useProblemScores;
