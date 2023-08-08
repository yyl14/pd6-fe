import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteChallenge, editChallenge, readChallenge } from './fetchers';

const useChallenge = (challengeId: number) => {
  const readChallengeSWR = useSWR(`/Challenge/${challengeId}`, () => readChallenge({ challenge_id: challengeId }));
  const deleteChallengeSWR = useSWRMutation(`/Challenge/${challengeId}`, () =>
    deleteChallenge({ challenge_id: challengeId }),
  );
  const editChallengeSWR = useSWRMutation(`/Challenge/${challengeId}`, toSWRMutationFetcher(editChallenge));

  return {
    challenge: readChallengeSWR.data?.data.data,
    editChallenge: editChallengeSWR.trigger,
    deleteChallenge: deleteChallengeSWR.trigger,

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
