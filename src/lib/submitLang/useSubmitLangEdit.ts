import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { editSubmitLang } from './fetchers';

const useSubmitLangEdit = (submitLangId: number) => {
  const editSubmitLangSWR = useSWRMutation(`/submission/language/${submitLangId}`, toSWRFetcher(editSubmitLang));

  return {
    editSubmitLang: editSubmitLangSWR.trigger,
    isLoading: {
      edit: editSubmitLangSWR.isMutating,
    },
    error: {
      edit: editSubmitLangSWR.error,
    },
  };
};

export default useSubmitLangEdit;
