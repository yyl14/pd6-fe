import useSWR from 'swr';
import { batchGetAccountWithDefaultStudentId } from './fetchers';

const useAccountSummaries = (accountIds: string[]) => {
  const batchGetAccountWithDefaultStudentIdSWR = useSWR(`/account-summary/batch`, () =>
    batchGetAccountWithDefaultStudentId({ account_ids: JSON.stringify(accountIds) }),
  );

  return {
    accountSummaries: batchGetAccountWithDefaultStudentIdSWR.data?.data.data,
    isLoading: {
      accountSummaries: batchGetAccountWithDefaultStudentIdSWR.isLoading,
    },
    error: {
      accountSummaries: batchGetAccountWithDefaultStudentIdSWR.error,
    },
  };
};

export default useAccountSummaries;
