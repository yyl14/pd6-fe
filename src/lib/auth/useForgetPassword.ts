import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { forgetPassword } from './fetchers';

const useForgetPassword = () => {
  const forgetPasswordSWR = useSWRMutation('/account/forget-password', toSWRFetcher(forgetPassword));

  return {
    forgetPassword: forgetPasswordSWR.trigger,
    isLoading: {
      forgetPassword: forgetPasswordSWR.isMutating,
    },
    error: {
      forgetPassword: forgetPasswordSWR.error,
    },
  };
};

export default useForgetPassword;
