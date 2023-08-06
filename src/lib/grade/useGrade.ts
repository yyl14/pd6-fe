import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRFetcher from '../../function/toSWRMutationFetcher';
import { deleteGrade, editGrade, getGrade } from './fetchers';

const useGrade = (gradeId: number) => {
  const editGradeSWR = useSWRMutation(`/grade/${gradeId}`, toSWRFetcher(editGrade));
  const getGradeSWR = useSWR(`/grade/${gradeId}`, () => getGrade({ grade_id: gradeId }));
  const deleteGradeSWR = useSWRMutation(`/grade/${gradeId}`, toSWRFetcher(deleteGrade));

  return {
    editGrade: editGradeSWR.trigger,
    getGrade: getGradeSWR.data?.data.data,
    deleteGrade: deleteGradeSWR.trigger,

    isLoading: {
      edit: editGradeSWR.isMutating,
      get: getGradeSWR.isLoading,
      delete: deleteGradeSWR.isMutating,
    },

    error: {
      edit: editGradeSWR.error,
      get: getGradeSWR.error,
      delete: deleteGradeSWR.error,
    },
  };
};

export default useGrade;
