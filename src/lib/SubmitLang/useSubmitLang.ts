import useSWR from 'swr';
import { browseAllSubmitLang } from './fetchers';

const useSubmitLang = () => {
  const browseAllSubmitLangSWR = useSWR('/submission/language', () => browseAllSubmitLang({}));

  return {
    submitLang: browseAllSubmitLangSWR.data?.data.data,
    mutateSubmitLangs: () => browseAllSubmitLangSWR.mutate(),
    isLoading: {
      browseAll: browseAllSubmitLangSWR.isLoading,
    },
    error: {
      browseAll: browseAllSubmitLangSWR.error,
    },
  };
};

export default useSubmitLang;
