import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { addNormalAccount, importAccount } from './fetchers';

const useAccountAdmin = () => {
  const addNormalAccountSWR = useSWRMutation(`/account-normal`, toSWRFetcher(addNormalAccount));
  const importAccountSWR = useSWRMutation(`/account-import`, toSWRFetcher(importAccount));

  return {
    addNormalAccount: addNormalAccountSWR.trigger,
    importAccount: importAccountSWR.trigger,
    isLoading: {
      addNormalAccount: addNormalAccountSWR.isMutating,
      importAccount: importAccountSWR.isMutating,
    },
    error: {
      addNormalAccount: addNormalAccountSWR.error,
      importAccount: importAccountSWR.error,
    },
  };
};

export default useAccountAdmin;
