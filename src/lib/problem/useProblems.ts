import useSWR from 'swr';
import { browseAllProblem } from './fetchers';

const useProblems = () => {
  const browseAllProblemSWR = useSWR('/problem', () => browseAllProblem({}));

  return {
    problems: browseAllProblemSWR.data?.data.data,
    isLoading: {
      browseAll: browseAllProblemSWR.isLoading,
    },
    error: {
      browseAll: browseAllProblemSWR.error,
    },
  };
};

export default useProblems;
