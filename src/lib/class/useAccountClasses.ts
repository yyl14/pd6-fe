import useSWR from 'swr';

import { browseAllAccountWithClassRole } from './fetchers';

const useAccountClasses = (accountId: number) => {
  const browseAllAccountWithClassRoleSWR = useSWR(`/account/${accountId}/class`, () =>
    browseAllAccountWithClassRole({ account_id: accountId }),
  );

  return {
    accountClasses: browseAllAccountWithClassRoleSWR.data?.data.data,

    isLoading: {
      browse: browseAllAccountWithClassRoleSWR.isLoading,
    },
    error: {
      browse: browseAllAccountWithClassRoleSWR.error,
    },
  };
};

export default useAccountClasses;
