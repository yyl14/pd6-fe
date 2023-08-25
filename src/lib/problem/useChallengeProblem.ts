import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addProblemUnderChallenge } from './fetchers';

const useChallengeProblem = (challengeId: number) => {
  const addProblemSWR = useSWRMutation(
    `/challenge/${challengeId}/problem`,
    toSWRMutationFetcher(addProblemUnderChallenge),
  );

  return {
    addProblem: addProblemSWR.trigger,

    isLoading: {
      add: addProblemSWR.isMutating,
    },
    error: {
      add: addProblemSWR.error,
    },
  };
};

export default useChallengeProblem;
