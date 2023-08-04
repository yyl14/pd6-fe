import useSWR from 'swr';
import { readProblemStatistics } from './fetchers';

const useProblemStatistics = (problemId: number) => {
  const readProblemStatisticsSWR = useSWR(`/problem/${problemId}/statistics`, () =>
    readProblemStatistics({ problem_id: problemId }),
  );

  return {
    statistics: readProblemStatisticsSWR.data?.data.data,
    isLoading: {
      statistics: readProblemStatisticsSWR.isLoading,
    },
    error: {
      statistics: readProblemStatisticsSWR.error,
    },
  };
};

export default useProblemStatistics;
