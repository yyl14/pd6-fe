import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { deleteClass, editClass, readClass } from './fetchers';

const useClass = (classId: number) => {
  const readClassSWR = useSWR(classId ? `/class/${classId}` : null, () => readClass({ class_id: classId }));
  const deleteClassSWR = useSWRMutation(`/class/${classId}`, () => deleteClass({ class_id: classId }));
  const editClassSWR = useSWRMutation(`/class/${classId}`, toSWRMutationFetcher(editClass));

  return {
    class: readClassSWR.data?.data.data,
    editClass: editClassSWR.trigger,
    deleteClass: deleteClassSWR.trigger,

    isLoading: {
      read: readClassSWR.isLoading,
      delete: deleteClassSWR.isMutating,
      edit: editClassSWR.isMutating,
    },
    error: {
      read: readClassSWR.error,
      delete: deleteClassSWR.error,
      edit: editClassSWR.error,
    },
  };
};

export default useClass;
