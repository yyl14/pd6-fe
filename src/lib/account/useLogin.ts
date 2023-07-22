import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { logIn } from './fetchers';

const useLogin = () => {
  const logInSWR = useSWRMutation('/account/jwt', toSWRFetcher(logIn));

  return {
    logIn: logInSWR.trigger,
    isLoading: {
      logIn: logInSWR.isMutating,
    },
    error: {
      logIn: logInSWR.error ?? logInSWR.data?.data.error,
    },
  };
};

export default useLogin;
