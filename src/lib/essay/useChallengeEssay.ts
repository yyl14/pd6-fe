import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addEssayUnderChallenge } from './fetchers';

const useChallengeEssay = (challengeId: number) => {
  const addEssaySWR = useSWRMutation(`/challenge/${challengeId}/essay`, toSWRMutationFetcher(addEssayUnderChallenge));

  return {
    addEssay: addEssaySWR.trigger,

    isLoading: {
      add: addEssaySWR.isMutating,
    },
    error: {
      add: addEssaySWR.error,
    },
  };
};

export default useChallengeEssay;
