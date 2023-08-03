import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { readProblem, deleteProblem, editProblem } from './fetchers';

const useProblem = (problemId: number) => {
  const readProblemSWR = useSWR(`/Problem/${problemId}`, () => readProblem({ problem_id: problemId }));
  const deleteProblemSWR = useSWRMutation(`/Problem/${problemId}`, () => deleteProblem({ problem_id: problemId }));
  const editProblemSWR = useSWRMutation(`/Problem/${problemId}`, toSWRMutationFetcher(editProblem));

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
