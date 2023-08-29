import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteProblem, editProblem, readProblem } from './fetchers';

const useProblem = (problemId?: number) => {
  const key = problemId ? `/Problem/${problemId}` : null;

  const readProblemSWR = useSWR(key, () => (problemId ? readProblem({ problem_id: problemId }) : null));
  const deleteProblemSWR = useSWRMutation(key, () => {
    if (problemId) deleteProblem({ problem_id: problemId });
  });
  const editProblemSWR = useSWRMutation(key, toSWRMutationFetcher(editProblem));

  return {
    problem: readProblemSWR.data?.data.data,
    editProblem: editProblemSWR.trigger,
    deleteProblem: deleteProblemSWR.trigger,

    isLoading: {
      read: readProblemSWR.isLoading,
      delete: deleteProblemSWR.isMutating,
      edit: editProblemSWR.isMutating,
    },
    error: {
      read: readProblemSWR.error,
      delete: deleteProblemSWR.error,
      edit: editProblemSWR.error,
    },
  };
};

export default useProblem;
