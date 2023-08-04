import useSWRMutation from 'swr/mutation';
import { components } from '../../../types/schema';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { addClassGrade, browseClassGrade, importClassGrade } from './fetchers';

export type ClassGradeSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useClassGrade = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ClassGradeSchema>();

  const addClassGradeSWR = useSWRMutation(`/class/${classId}/grade`, toSWRMutationFetcher(addClassGrade));
  const browseClassGradeSWR = useSWRWithBrowseParams(`/class/${classId}/grade`, browseClassGrade, {
    class_id: classId,
  });
  const importClassGradeSWR = useSWRMutation(`/class/${classId}/grade-import`, toSWRMutationFetcher(importClassGrade));

  return {
    browseClassGrade: {
      data: browseClassGradeSWR.data?.data.data,
      refresh: browseClassGradeSWR.mutate,
      pagination: browseClassGradeSWR.pagination,
      filter: browseClassGradeSWR.filter,
      sort: browseClassGradeSWR.sort,
    },
    addClassGrade: addClassGradeSWR.trigger,
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
