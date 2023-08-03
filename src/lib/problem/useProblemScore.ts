import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { readProblemScore, readProblemBestScore } from './fetchers';

const useProblemScore = () => {
  const readProblemScoreSWR = useSWRMutation(`/Problem/score`, toSWRMutationFetcher(readProblemScore));
  const readProblemBestScoreSWR = useSWRMutation(`/Problem/best-score`, toSWRMutationFetcher(readProblemBestScore));

  return {
    score: readProblemScoreSWR.data?.data.data,
    bestScore: readProblemBestScoreSWR.data?.data.data,

    isLoading: {
      score: readProblemScoreSWR.isMutating,
      bestScore: readProblemBestScoreSWR.isMutating,
    },
    error: {
      score: readProblemScoreSWR.error,
      bestScore: readProblemBestScoreSWR.error,
    },
  };
};

export default useProblemScore;
