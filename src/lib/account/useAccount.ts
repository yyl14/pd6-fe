import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { deleteAccount, editAccount, makeStudentCardDefault, readAccountWithDefaultStudentId } from './fetchers';

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
  const makeStudentCardDefaultSWR = useSWRMutation(
    `/account/${accountId}/default-student-card`,
    toSWRFetcher(({ student_card_id }: { student_card_id: number }) =>
      makeStudentCardDefault({ account_id: accountId, student_card_id }),
    ),
  );

  return {
    account: readAccountWithDefaultStudentIdSWR.data?.data.data,
    deleteAccount: deleteAccountSWR.trigger,
    editAccount: editAccountSWR.trigger,
    makeStudentCardDefault: makeStudentCardDefaultSWR.trigger,
    isLoading: {
      account: readAccountWithDefaultStudentIdSWR.isLoading,
      deleteAccount: deleteAccountSWR.isMutating,
      editAccount: editAccountSWR.isMutating,
      makeStudentCardDefault: makeStudentCardDefaultSWR.isMutating,
    },
    error: {
      account: readAccountWithDefaultStudentIdSWR.error,
      deleteAccount: deleteAccountSWR.error,
      editAccount: editAccountSWR.error,
      makeStudentCardDefault: makeStudentCardDefaultSWR.error,
    },
  };
};

export default useAccount;
