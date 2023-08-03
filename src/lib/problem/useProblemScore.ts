import useSWR from 'swr';
import { readProblemScore, readProblemBestScore } from './fetchers';

const useProblemScore = (problemId: number) => {
  const readProblemScoreSWR = useSWR(`/Problem/${problemId}/score`, () => readProblemScore({ problem_id: problemId }));
  const readProblemBestScoreSWR = useSWR(`/Problem/${problemId}/best-score`, () =>
    readProblemBestScore({ problem_id: problemId }),
  );

  return {
    score: readProblemScoreSWR.data?.data.data,
    bestScore: readProblemBestScoreSWR.data?.data.data,

    isLoading: {
      score: readProblemScoreSWR.isLoading,
      bestScore: readProblemBestScoreSWR.isLoading,
    },
    error: {
      score: readProblemScoreSWR.error,
      bestScore: readProblemBestScoreSWR.error,
    },
  };
};

export default useProblemScore;
