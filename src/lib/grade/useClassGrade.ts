import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';
import { fetchAPI } from '@/lib/api';

import { components } from '../../../types/schema';
import { addClassGrade } from './fetchers';

export type ClassGradeSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useClassGrade = (classId: number) => {
  const addClassGradeSWR = useSWRMutation(`/class/${classId}/grade`, toSWRMutationFetcher(addClassGrade));
  const [importError, setImportError] = useState<string | null>(null);

  async function importGrade(title: string, file: Blob) {
    const formData = new FormData();
    formData.append('grade_file', file);

    const options = {
      params: {
        title,
      },
      method: 'POST',
      body: formData,
    };

    try {
      await fetchAPI(`/class/${classId}/grade-import`, options);
    } catch (e) {
      setImportError(String(e));
      throw e;
    }
  }

  return {
    addClassGrade: addClassGradeSWR.trigger,
    importClassGrade: importGrade,

    isLoading: {
      add: addClassGradeSWR.isMutating,
    },

    error: {
      add: addClassGradeSWR.error,
      import: importError,
    },
  };
};

export default useClassGrade;
