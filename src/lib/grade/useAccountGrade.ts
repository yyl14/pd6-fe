import useSWRWithBrowseParams from '../../hooks/useSWRWithBrowseParams';
import { browseAccountGrade } from './fetchers';

const useAccountGrade = (accGrade_id: number) => {
  const browseAccountGradeSWR = useSWRWithBrowseParams(`/account/${accGrade_id}/grade`, browseAccountGrade, {
    account_id: accGrade_id,
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
