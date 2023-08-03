import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { addClassGrade, browseClassGrade, importClassGrade } from './fetchers';

const useClassGrade = (classId: number) => {
  const addClassGradeSWR = useSWRMutation(`/class/${classId}/grade`, toSWRMutationFetcher(addClassGrade));
  const browseClassGradeSWR = useSWR(`/class/${classId}/grade`, () => browseClassGrade({ class_id: classId }));
  const importClassGradeSWR = useSWRMutation(`/class/${classId}/grade-import`, toSWRMutationFetcher(importClassGrade));

  return {
    classGrade: browseClassGradeSWR.data?.data.data,
    addClassGrade: addClassGradeSWR.trigger,
    mutateClassGrade: browseClassGradeSWR.mutate(),
    importClassGrade: importClassGradeSWR.trigger,

    isLoading: {
      browse: browseClassGradeSWR.isLoading,
      add: addClassGradeSWR.isMutating,
      import: importClassGradeSWR.isMutating,
    },

    error: {
      browse: browseClassGradeSWR.error,
      add: addClassGradeSWR.error,
      import: importClassGradeSWR.error,
    },
  };
};

export default useClassGrade;
