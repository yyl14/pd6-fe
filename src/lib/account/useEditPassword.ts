import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { editPassword } from './fetchers';

const useEditPassword = (account_id: number) => {
  const editPasswordSWR = useSWRMutation(`/account/${account_id}/pass_hash`, toSWRFetcher(editPassword));

  return {
    editPassword: editPasswordSWR.trigger,
    isLoading: {
      editPassword: editPasswordSWR.isMutating,
    },
    error: {
      editPassword: editPasswordSWR.error,
    },
  };
};

export default useEditPassword;
