import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';

import { components } from '../../../types/schema';
import { browseAccountGrade } from './fetchers';

export type AccountGradeSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useAccountGrade = (accountId: number) => {
  const useSWRWithBrowseParams = withDataSchema<AccountGradeSchema>();

  const browseAccountGradeSWR = useSWRWithBrowseParams(`/account/${accountId}/grade`, browseAccountGrade, {
    account_id: accountId,
  });

  return {
    browseAccountGradeSWR: {
      data: browseAccountGradeSWR.data?.data.data,
      refresh: browseAccountGradeSWR.mutate,
      pagination: browseAccountGradeSWR.pagination,
      filter: browseAccountGradeSWR.filter,
      sort: browseAccountGradeSWR.sort,
    },

    isLoading: {
      browseAccountGrade: browseAccountGradeSWR.isLoading,
    },

    error: {
      browseAccountGrade: browseAccountGradeSWR.error,
    },
  };
};

export default useAccountGrade;
