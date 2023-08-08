import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { readProblemBestScore, readProblemScore } from './fetchers';

const useProblemScore = () => {
  const readProblemScoreSWR = useSWRMutation(`/Problem/{problem_id}/score`, toSWRMutationFetcher(readProblemScore));
  const readProblemBestScoreSWR = useSWRMutation(
    `/Problem/{problem_id}/best-score`,
    toSWRMutationFetcher(readProblemBestScore),
  );

  return {
    readScore: readProblemScoreSWR.trigger,
    readBestScore: readProblemBestScoreSWR.trigger,

    isLoading: {
      readScore: readProblemScoreSWR.isMutating,
      readBestScore: readProblemBestScoreSWR.isMutating,
    },
    error: {
      readScore: readProblemScoreSWR.error,
      readBestScore: readProblemBestScoreSWR.error,
    },
  };
};

export default useProblemScore;
