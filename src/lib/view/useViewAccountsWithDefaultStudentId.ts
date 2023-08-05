import useSWR from 'swr';
import { browseAccountWithDefaultStudentId } from './fetchers';

const useViewAccountsWithDefaultStudentId = () => {
  const browseAccountWithDefaultStudentIdSWR = useSWR(`/view/account`, browseAccountWithDefaultStudentId);

  return {
    account: browseAccountWithDefaultStudentIdSWR.data?.data.data,

    isLoading: {
      browse: browseAccountWithDefaultStudentIdSWR.isLoading,
    },

    error: {
      browse: browseAccountWithDefaultStudentIdSWR.error,
    },
  };
};

export default useViewAccountsWithDefaultStudentId;
