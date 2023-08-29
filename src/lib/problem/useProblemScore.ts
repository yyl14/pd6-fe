import useSWR from 'swr';

import { readProblemBestScore, readProblemScore } from './fetchers';

const useProblemScore = (problemId: number) => {
  const readProblemScoreSWR = useSWR(`/Problem/${problemId}/score`, () => readProblemScore({ problem_id: problemId }));

  const readProblemBestScoreSWR = useSWR(`/Problem/${problemId}/best-score`, () =>
    readProblemBestScore({ problem_id: problemId }),
  );

  return {
    score: readProblemScoreSWR.data?.data.data,
    bestScore: readProblemBestScoreSWR.data?.data.data,

    isLoading: {
      readScore: readProblemScoreSWR.isLoading,
      readBestScore: readProblemBestScoreSWR.isLoading,
    },
    error: {
      readScore: readProblemScoreSWR.error,
      readBestScore: readProblemBestScoreSWR.error,
    },
  };
};

export default useProblemScore;
