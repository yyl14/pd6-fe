import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addInstitute, browseAllInstitute } from './fetchers';

const useInstitutes = () => {
  const browseAllInstituteSWR = useSWR('/institute', () => browseAllInstitute({}));
  const addInstituteSWR = useSWRMutation('/institute', toSWRMutationFetcher(addInstitute));

  return {
    institutes: browseAllInstituteSWR.data?.data.data,
    addInstitute: addInstituteSWR.trigger,
    isLoading: {
      browseAll: browseAllInstituteSWR.isLoading,
      add: addInstituteSWR.isMutating,
    },
    error: {
      browseAll: browseAllInstituteSWR.error,
      add: addInstituteSWR.error,
    },
  };
};

export default useInstitutes;
