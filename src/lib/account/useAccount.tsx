import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { deleteAccount, editAccount, readAccountWithDefaultStudentId } from './fetchers';

const useAccount = (accountId: number) => {
  const readAccountWithDefaultStudentIdSWR = useSWR(`/account/${accountId}`, () =>
    readAccountWithDefaultStudentId({ account_id: accountId }),
  );
  const deleteAccountSWR = useSWRMutation(
    `/account/${accountId}`,
    toSWRFetcher(() => deleteAccount({ account_id: accountId })),
  );
  const editAccountSWR = useSWRMutation(
    `/account/${accountId}`,
    toSWRFetcher(() => editAccount({ account_id: accountId })),
  );

  return {
    account: readAccountWithDefaultStudentIdSWR.data?.data.data,
    deleteAccount: deleteAccountSWR.trigger,
    editAccount: editAccountSWR.trigger,
    isLoading: {
      account: readAccountWithDefaultStudentIdSWR.isLoading,
      deleteAccount: deleteAccountSWR.isMutating,
      editAccount: editAccountSWR.isMutating,
    },
    error: {
      account: readAccountWithDefaultStudentIdSWR.error,
      deleteAccount: deleteAccountSWR.error,
      editAccount: editAccountSWR.error,
    },
  };
};

export default useAccount;
