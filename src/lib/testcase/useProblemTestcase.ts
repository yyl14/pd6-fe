import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addTestcase, browseAllTestcase } from './fetchers';

const useProblemTestcase = (problemId: number) => {
  const browseAllTestcaseSWR = useSWR(`/problem/{problem_id}/testcase`, () =>
    browseAllTestcase({ problem_id: problemId }),
  );

  const addTestcaseSWR = useSWRMutation(`/problem/{problem_id}/testcase`, toSWRMutationFetcher(addTestcase));

  return {
    browseTestcase: browseAllTestcaseSWR.data?.data.data,
    addTestcase: addTestcaseSWR.trigger,

    isLoading: {
      browse: browseAllTestcaseSWR.isLoading,
      add: addTestcaseSWR.isMutating,
    },

    error: {
      browse: browseAllTestcaseSWR.error,
      add: addTestcaseSWR.error,
    },
  };
};

export default useProblemTestcase;
