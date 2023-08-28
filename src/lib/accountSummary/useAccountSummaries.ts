import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { components } from '../../../types/schema';
import { batchGetAccountWithDefaultStudentId } from './fetchers';

export type AccountSummarySchema = components['schemas']['pydantic__dataclasses__BatchGetAccountOutput'];

const useAccountSummaries = () => {
  const batchGetAccountWithDefaultStudentIdSWR = useSWRMutation(
    `/account-summary/batch`,
    toSWRMutationFetcher(batchGetAccountWithDefaultStudentId),
  );

  return {
    getAccountSummaries: batchGetAccountWithDefaultStudentIdSWR.trigger,
    isLoading: {
      accountSummaries: batchGetAccountWithDefaultStudentIdSWR.isMutating,
    },
    error: {
      accountSummaries: batchGetAccountWithDefaultStudentIdSWR.error,
    },
  };
};

export default useAccountSummaries;
