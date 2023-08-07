import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseAccountWithDefaultStudentId } from './fetchers';

export type AccountsWithDefaultStudentIdSchema = components['schemas']['BrowseAccountOutput'];

const useViewAccountsWithDefaultStudentId = () => {
  const useSWRWithBrowseParams = withDataSchema<AccountsWithDefaultStudentIdSchema>();

  const browseAccountWithDefaultStudentIdSWR = useSWRWithBrowseParams(
    `/view/account`,
    browseAccountWithDefaultStudentId,
    { limit: 50, offset: 0 },
  );

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
