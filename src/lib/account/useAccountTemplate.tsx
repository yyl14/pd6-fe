import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { getAccountTemplateFile } from './fetchers';

const useAccountTemplate = () => {
  const getAccountTemplateFileSWR = useSWRMutation(`/account/template`, toSWRFetcher(getAccountTemplateFile));

  return {
    accountTemplate: getAccountTemplateFileSWR.trigger,
    isLoading: {
      accountTemplate: getAccountTemplateFileSWR.isMutating,
    },
    error: {
      accountTemplate: getAccountTemplateFileSWR.error,
    },
  };
};

export default useAccountTemplate;
