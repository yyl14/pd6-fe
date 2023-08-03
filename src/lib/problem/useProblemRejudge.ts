import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addProblemRejudge } from './fetchers';

const useProblemRejudge = (problemId: number) => {
  const addProblemRejudgeSWR = useSWRMutation(`/problem/${problemId}/rejudge`, toSWRMutationFetcher(addProblemRejudge));

  return {
    addProblemRejudge: addProblemRejudgeSWR.trigger,

    isLoading: {
      addProblemRejudge: addProblemRejudgeSWR.isMutating,
    },

    error: {
      addProblemRejudge: addProblemRejudgeSWR.error,
    },
  };
};

export default useProblemRejudge;
