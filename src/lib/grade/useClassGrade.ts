import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { components } from '../../../types/schema';
import { addClassGrade, importClassGrade } from './fetchers';

export type ClassGradeSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useClassGrade = (classId: number) => {
  const addClassGradeSWR = useSWRMutation(`/class/${classId}/grade`, toSWRMutationFetcher(addClassGrade));
  const importClassGradeSWR = useSWRMutation(`/class/${classId}/grade-import`, toSWRMutationFetcher(importClassGrade));

  async function importGrade(title: string, file: Blob) {
    const formData = new FormData();
    formData.append('grade_file', file);

    await importClassGradeSWR.trigger({
      title: title as never,
      class_id: classId as never,
      content: {
        'multipart/form-data': {
          grade_file: formData,
        },
      } as never,
    });
  }

  return {
    addClassGrade: addClassGradeSWR.trigger,
    importClassGrade: importGrade,

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

// parameters: {
//   query: {
//       title: string;
//   };
//   header?: {
//       "auth-token"?: string | undefined;
//   } | undefined;
//   path: {
//       class_id: number;
//   };
// };
// requestBody: {
//   content: {
//       "multipart/form-data": {
//           grade_file: string;
//       };
//   };
// };
