import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { forgetUsername } from './fetchers';

const useForgetUsername = () => {
  const forgetUsernameSWR = useSWRMutation('/account/forget-username', toSWRFetcher(forgetUsername));

  return {
    forgetUsername: forgetUsernameSWR.trigger,
    isLoading: {
      forgetUsername: forgetUsernameSWR.isMutating,
    },
    error: {
      forgetUsername: forgetUsernameSWR.error,
    },
  };
};

export default useForgetUsername;
