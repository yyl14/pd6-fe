import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteChallenge, editChallenge, readChallenge } from './fetchers';

const useChallenge = (challengeId?: number) => {
  const key = challengeId ? `/Challenge/${challengeId}` : null;

  const readChallengeSWR = useSWR(key, () => (challengeId ? readChallenge({ challenge_id: challengeId }) : null));
  const deleteChallengeSWR = useSWRMutation(key, () => {
    if (challengeId) deleteChallenge({ challenge_id: challengeId });
  });
  const editChallengeSWR = useSWRMutation(key, toSWRMutationFetcher(editChallenge));

  return {
    challenge: readChallengeSWR.data?.data.data,
    editChallenge: editChallengeSWR.trigger,
    deleteChallenge: deleteChallengeSWR.trigger,
    mutateChallenge: readChallengeSWR,

    isLoading: {
      read: readChallengeSWR.isLoading,
      delete: deleteChallengeSWR.isMutating,
      edit: editChallengeSWR.isMutating,
    },
    error: {
      read: readChallengeSWR.error,
      delete: deleteChallengeSWR.error,
      edit: editChallengeSWR.error,
    },
  };
};

export default useChallenge;
