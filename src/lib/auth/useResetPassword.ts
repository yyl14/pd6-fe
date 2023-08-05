import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { resetPassword } from './fetchers';

const useResetPassword = () => {
  const resetPasswordSWR = useSWRMutation('/account/reset-password', toSWRFetcher(resetPassword));

  return {
    resetPassword: resetPasswordSWR.trigger,
    isLoading: {
      resetPassword: resetPasswordSWR.isMutating,
    },
    error: {
      resetPassword: resetPasswordSWR.error,
    },
  };
};

export default useResetPassword;
