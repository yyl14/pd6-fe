import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { rejudgeProblem } from './fetchers';

const useProblemRejudge = (problemId: number) => {
  const rejudgeProblemSWR = useSWRMutation(`/problem/${problemId}/rejudge`, toSWRMutationFetcher(rejudgeProblem));

  return {
    rejudgeProblem: rejudgeProblemSWR.trigger,

    isLoading: {
      rejudgeProblem: rejudgeProblemSWR.isMutating,
    },

    error: {
      rejudgeProblem: rejudgeProblemSWR.error,
    },
  };
};

export default useProblemRejudge;
