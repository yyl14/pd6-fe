import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { components } from '../../../types/schema';
import { addClassGrade, importClassGrade } from './fetchers';

export type ClassGradeSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useClassGrade = (classId: number) => {
  const addClassGradeSWR = useSWRMutation(`/class/${classId}/grade`, toSWRMutationFetcher(addClassGrade));
  const importClassGradeSWR = useSWRMutation(`/class/${classId}/grade-import`, importClassGrade);

  return {
    addClassGrade: addClassGradeSWR.trigger,
    importClassGrade: importClassGradeSWR.trigger,

    isLoading: {
      add: addClassGradeSWR.isMutating,
      import: importClassGradeSWR.isMutating,
    },

    error: {
      add: addClassGradeSWR.error,
      import: importClassGradeSWR.error,
    },
  };
};

export default useClassGrade;
