import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addAssistingData, browseAssistingData } from './fetchers';

const useProblemAssistingData = (problemId: number) => {
  const browseAssistingDataSWR = useSWR(`/problem/{problem_id}/assisting-data`, () =>
    browseAssistingData({ problem_id: problemId }),
  );

  const addAssistingDataSWR = useSWRMutation(
    `/problem/{problem_id}/assisting-data`,
    toSWRMutationFetcher(addAssistingData),
  );

  return {
    assistingData: browseAssistingDataSWR.data?.data.data,
    addAssistingData: addAssistingDataSWR.trigger,

    isLoading: {
      browse: browseAssistingDataSWR.isLoading,
      add: addAssistingDataSWR.isMutating,
    },

    error: {
      browse: browseAssistingDataSWR.error,
      add: addAssistingDataSWR.error,
    },
  };
};

export default useProblemAssistingData;
