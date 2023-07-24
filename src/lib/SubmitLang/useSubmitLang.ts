import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addSubmitLang, browseAllSubmitLang } from './fetchers';

const useSubmitLang = () => {
  const browseAllSubmitLangSWR = useSWR('/submission/language', () => browseAllSubmitLang({}));
  const addSubmitLangSWR = useSWRMutation('/institute', toSWRMutationFetcher(addSubmitLang));

  return {
    submitLang: browseAllSubmitLangSWR.data?.data.data,
    addSubmitLang: addSubmitLangSWR.trigger,
    isLoading: {
      browseAll: browseAllSubmitLangSWR.isLoading,
      add: addSubmitLangSWR.isMutating,
    },
    error: {
      browseAll: browseAllSubmitLangSWR.error,
      add: addSubmitLangSWR.error,
    },
  };
};

export default useSubmitLang;
