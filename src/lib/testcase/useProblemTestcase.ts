import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addTestcase, browseAllTestcase, downloadAllNonSampleTestcase, downloadAllSampleTestcase } from './fetchers';

const useProblemTestcase = (problemId: number) => {
  const browseAllTestcaseSWR = useSWR(`/problem/{problem_id}/testcase`, () =>
    browseAllTestcase({ problem_id: problemId }),
  );

  const addTestcaseSWR = useSWRMutation(`/problem/{problem_id}/testcase`, toSWRMutationFetcher(addTestcase));

  const downloadAllSampleTestcaseSWR = useSWRMutation(
    `/problem/{problem_id}/all-sample-testcase`,
    toSWRMutationFetcher(downloadAllSampleTestcase),
  );

  const downloadAllNonSampleTestcaseSWR = useSWRMutation(
    `/problem/{problem_id}/all-non-sample-testcase`,
    toSWRMutationFetcher(downloadAllNonSampleTestcase),
  );

  return {
    browseTestcase: browseAllTestcaseSWR.data?.data.data,
    addTestcase: addTestcaseSWR.trigger,
    sampleTestcases: downloadAllSampleTestcaseSWR.data?.data.data,
    nonSampleTestcases: downloadAllNonSampleTestcaseSWR.data?.data.data,

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

export default useProblemTestcase;
