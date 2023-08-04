import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { submit } from './fetchers';

const useSubmit = (problemId: number) => {
  const submitSWR = useSWRMutation(`/problem/${problemId}/submission`, toSWRFetcher(submit));

  return {
    submit: submitSWR.trigger,
    isLoading: {
      submit: submitSWR.isMutating,
    },
    error: {
      submit: submitSWR.error,
    },
  };
};

export default useSubmit;
