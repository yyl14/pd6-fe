import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseAccountWithDefaultStudentId } from './fetchers';

export type AccountsWithDefaultStudentIdSchema = components['schemas']['ViewAccountOutput'];

const useViewAccountsWithDefaultStudentId = () => {
  const useSWRWithBrowseParams = withDataSchema<AccountsWithDefaultStudentIdSchema>();

  const browseAccountWithDefaultStudentIdSWR = useSWRWithBrowseParams(
    `/view/account`,
    browseAccountWithDefaultStudentId,
    { limit: 50, offset: 0 },
  );

  return {
    account: {
      data: browseAccountWithDefaultStudentIdSWR.data?.data.data,
      filter: browseAccountWithDefaultStudentIdSWR.filter,
      pagination: browseAccountWithDefaultStudentIdSWR.pagination,
      sort: browseAccountWithDefaultStudentIdSWR.sort,
    },

    isLoading: {
      browse: browseAccountWithDefaultStudentIdSWR.isLoading,
    },

    error: {
      browse: browseAccountWithDefaultStudentIdSWR.error,
    },
  };
};

export default useViewAccountsWithDefaultStudentId;
