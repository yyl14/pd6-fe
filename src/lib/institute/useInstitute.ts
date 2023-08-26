import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { editInstitute, readInstitute } from './fetchers';

const useInstitute = (instituteId: number) => {
  const readInstituteSWR = useSWR(`/institute/${instituteId}`, () => readInstitute({ institute_id: instituteId }));
  const editInstituteSWR = useSWRMutation(`/institute/${instituteId}`, toSWRFetcher(editInstitute));

  return {
    institute: readInstituteSWR.data?.data.data,
    editInstitute: editInstituteSWR.trigger,
    isLoading: {
      read: readInstituteSWR.isLoading,
      edit: editInstituteSWR.isMutating,
    },
    error: {
      read: readInstituteSWR.error,
      edit: editInstituteSWR.error,
    },
  };
};

export default useInstitute;
