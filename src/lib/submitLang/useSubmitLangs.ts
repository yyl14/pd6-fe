import useSWR from 'swr';
import { browseAllSubmitLang } from './fetchers';

const useSubmitLangs = () => {
  const browseAllSubmitLangSWR = useSWR('/submission/language', () => browseAllSubmitLang({}));

  return {
    submitLangs: browseAllSubmitLangSWR.data?.data.data,
    mutateSubmitLangs: () => browseAllSubmitLangSWR.mutate(),
    isLoading: {
      browseAll: browseAllSubmitLangSWR.isLoading,
    },
    error: {
      browseAll: browseAllSubmitLangSWR.error,
    },
  };
};

export default useSubmitLangs;
