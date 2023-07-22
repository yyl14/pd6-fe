import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { addAccount } from './fetchers';

const useRegister = () => {
  const addAccountSWR = useSWRMutation('/account', toSWRFetcher(addAccount));

  return {
    register: addAccountSWR.trigger,
    isLoading: {
      register: addAccountSWR.isMutating,
    },
    error: {
      register: addAccountSWR.error ?? addAccountSWR.data?.data.error,
    },
  };
};

export default useRegister;
