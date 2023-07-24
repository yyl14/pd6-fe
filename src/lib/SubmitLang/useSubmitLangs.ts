import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { editSubmitLang } from './fetchers';

const useSubmitLangs = (submitLangId: number) => {
  const editInstituteSWR = useSWRMutation(`/submission/language/${submitLangId}`, toSWRFetcher(editSubmitLang));

  return {
    editInstitute: editInstituteSWR.trigger,
    isLoading: {
      add: editInstituteSWR.isMutating,
    },
    error: {
      add: editInstituteSWR.error,
    },
  };
};

export default useSubmitLangs;
