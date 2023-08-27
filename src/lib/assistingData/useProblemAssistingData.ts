import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addAssistingData, browseAssistingData, downloadAllAssistingData } from './fetchers';

const useProblemAssistingData = (problemId: number) => {
  const browseAssistingDataSWR = useSWR(`/problem/{problem_id}/assisting-data`, () =>
    browseAssistingData({ problem_id: problemId }),
  );

  const addAssistingDataSWR = useSWRMutation(`/problem/{problem_id}/assisting-data`, addAssistingData);

  const downloadAllAssistingDataSWR = useSWRMutation(
    `/problem/${problemId}/all-assisting-data`,
    toSWRMutationFetcher(downloadAllAssistingData),
  );

  return {
    assistingData: browseAssistingDataSWR.data?.data.data,
    addAssistingData: addAssistingDataSWR.trigger,
    downloadAllAssistingData: downloadAllAssistingDataSWR.trigger,

    isLoading: {
      browse: browseAssistingDataSWR.isLoading,
      add: addAssistingDataSWR.isMutating,
      downloadAssistingData: downloadAllAssistingDataSWR.isMutating,
    },

    error: {
      browse: browseAssistingDataSWR.error,
      add: addAssistingDataSWR.error,
      downloadAllAssistingData: downloadAllAssistingDataSWR.error,
    },
  };
};

export default useProblemAssistingData;
