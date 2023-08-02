import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { addNormalAccount } from './fetchers';

const useAccountAdmin = () => {
  const addNormalAccountSWR = useSWRMutation(`/account-normal`, toSWRFetcher(addNormalAccount));

  return {
    addNormalAccount: addNormalAccountSWR.trigger,
    isLoading: {
      addNormalAccount: addNormalAccountSWR.isMutating,
    },
    error: {
      addNormalAccount: addNormalAccountSWR.error,
    },
  };
};

export default useAccountAdmin;
