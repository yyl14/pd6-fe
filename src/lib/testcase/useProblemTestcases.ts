import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addTestcase, browseAllTestcase, downloadAllNonSampleTestcase, downloadAllSampleTestcase } from './fetchers';

const useProblemTestcases = (problemId: number) => {
  const browseAllTestcaseSWR = useSWR(`/problem/${problemId}/testcase`, () =>
    browseAllTestcase({ problem_id: problemId }),
  );

  const addTestcaseSWR = useSWRMutation(`/problem/${problemId}/testcase`, toSWRMutationFetcher(addTestcase));

  const downloadAllSampleTestcaseSWR = useSWRMutation(
    `/problem/${problemId}/all-sample-testcase`,
    toSWRMutationFetcher(downloadAllSampleTestcase),
  );

  const downloadAllNonSampleTestcaseSWR = useSWRMutation(
    `/problem/${problemId}/all-non-sample-testcase`,
    toSWRMutationFetcher(downloadAllNonSampleTestcase),
  );

  return {
    testcases: browseAllTestcaseSWR.data?.data.data,
    addTestcase: addTestcaseSWR.trigger,
    downloadSampleTestcases: downloadAllSampleTestcaseSWR.trigger,
    downloadNonSampleTestcases: downloadAllNonSampleTestcaseSWR.trigger,

    isLoading: {
      browse: browseAllTestcaseSWR.isLoading,
      add: addTestcaseSWR.isMutating,
      downloadSample: downloadAllSampleTestcaseSWR.isMutating,
      downloadNonSample: downloadAllNonSampleTestcaseSWR.isMutating,
    },

    error: {
      browse: browseAllTestcaseSWR.error,
      add: addTestcaseSWR.error,
      downloadSample: downloadAllSampleTestcaseSWR.error,
      downloadNonSample: downloadAllNonSampleTestcaseSWR.error,
    },
  };
};

export default useProblemTestcases;
