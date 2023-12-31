import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addAssistingDataUnderProblem, browseAssistingData, downloadAllAssistingData } from './fetchers';

const useProblemAssistingData = (problemId: number) => {
  const browseAssistingDataSWR = useSWR(`/problem/${problemId}/assisting-data`, () =>
    browseAssistingData({ problem_id: problemId }),
  );

  const downloadAllAssistingDataSWR = useSWRMutation(
    `/problem/${problemId}/all-assisting-data`,
    toSWRMutationFetcher(downloadAllAssistingData),
  );

  return {
    assistingData: browseAssistingDataSWR.data?.data.data,
    mutateProblemAssistingData: browseAssistingDataSWR.mutate,
    addAssistingDataUnderProblem,
    downloadAllAssistingData: downloadAllAssistingDataSWR.trigger,

    isLoading: {
      browse: browseAssistingDataSWR.isLoading,
      downloadAssistingData: downloadAllAssistingDataSWR.isMutating,
    },

    error: {
      browse: browseAssistingDataSWR.error,
      downloadAllAssistingData: downloadAllAssistingDataSWR.error,
    },
  };
};

export default useProblemAssistingData;
