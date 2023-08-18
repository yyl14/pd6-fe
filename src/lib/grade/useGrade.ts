import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { deleteGrade, editGrade, getGrade } from './fetchers';

const useGrade = (gradeId: number) => {
  const editGradeSWR = useSWRMutation(`/grade/${gradeId}`, toSWRFetcher(editGrade));
  const readGradeSWR = useSWR(`/grade/${gradeId}`, () => getGrade({ grade_id: gradeId }));
  const deleteGradeSWR = useSWRMutation(`/grade/${gradeId}`, toSWRFetcher(deleteGrade));

  return {
    editGrade: editGradeSWR.trigger,
    grade: readGradeSWR.data?.data.data,
    deleteGrade: deleteGradeSWR.trigger,

    isLoading: {
      edit: editGradeSWR.isMutating,
      read: readGradeSWR.isLoading,
      delete: deleteGradeSWR.isMutating,
    },

    error: {
      edit: editGradeSWR.error,
      read: readGradeSWR.error,
      delete: deleteGradeSWR.error,
    },
  };
};

export default useGrade;
