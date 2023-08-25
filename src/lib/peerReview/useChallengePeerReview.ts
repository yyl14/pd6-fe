import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addPeerReviewUnderChallenge } from './fetchers';

const useChallengePeerReview = (challengeId: number) => {
  const addPeerReviewSWR = useSWRMutation(
    `/challenge/${challengeId}/peer-review`,
    toSWRMutationFetcher(addPeerReviewUnderChallenge),
  );

  return {
    addPeerReview: addPeerReviewSWR.trigger,

    isLoading: {
      add: addPeerReviewSWR.isMutating,
    },
    error: {
      add: addPeerReviewSWR.error,
    },
  };
};

export default useChallengePeerReview;
