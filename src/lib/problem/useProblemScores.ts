import useSWR from 'swr';

import { readProblemScore } from './fetchers';

const useProblemScores = (problemIds: number[]) => {
  const readProblemScoreByIdsSWR = useSWR(['problemScores', ...problemIds], () =>
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
  );

  return {
    problemScores: readProblemScoreByIdsSWR.data,

    isLoading: {
      browse: readProblemScoreByIdsSWR.isLoading,
    },
    error: {
      browse: readProblemScoreByIdsSWR.error,
    },
  };
};

export default useProblemScores;
