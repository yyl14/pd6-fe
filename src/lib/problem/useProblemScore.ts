import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { readProblemScore, readProblemBestScore } from './fetchers';

const useProblemScore = () => {
  const readProblemScoreSWR = useSWRMutation(`/Problem/score`, toSWRMutationFetcher(readProblemScore));
  const readProblemBestScoreSWR = useSWRMutation(`/Problem/best-score`, toSWRMutationFetcher(readProblemBestScore));

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
