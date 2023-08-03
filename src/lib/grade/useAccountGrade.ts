import useSWR from 'swr';
import { browseAccountGrade } from './fetchers';

const useAccountGrade = (accGrade_id: number) => {
  const browseAccountGradeSWR = useSWR(`/account/${accGrade_id}/grade`, () =>
    browseAccountGrade({ account_id: accGrade_id }),
  );

  return {
    accountGrade: browseAccountGradeSWR.data?.data.data,

    isLoading: {
      browseAccountGrade: browseAccountGradeSWR.isLoading,
    },

    error: {
      browseAccountGrade: browseAccountGradeSWR.error,
    },
  };
};

export default useAccountGrade;
