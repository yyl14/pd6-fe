import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { getAccountTemplateFile } from './fetchers';

const useAccountTemplate = () => {
  const getAccountTemplateFileSWR = useSWRMutation(`/account/template`, toSWRFetcher(getAccountTemplateFile));

  return {
    getAccountTemplateFile: getAccountTemplateFileSWR.trigger,
    isLoading: {
      getAccountTemplateFile: getAccountTemplateFileSWR.isMutating,
    },
    error: {
      getAccountTemplateFile: getAccountTemplateFileSWR.error,
    },
  };
};

export default useAccountTemplate;
