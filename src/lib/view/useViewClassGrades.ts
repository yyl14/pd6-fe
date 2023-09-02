import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseClassGrade } from './fetchers';

export type ClassGradesSchema = components['schemas']['ViewGrade'];

const useViewClassGrades = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ClassGradesSchema>();

  const browseClassGradeSWR = useSWRWithBrowseParams(
    `/class/${classId}/view/grade`,
    browseClassGrade,
    {
      class_id: classId,
    },
    { baseSort: { column: 'update_time', order: 'DESC' } },
  );

  return {
    browseClassGrade: {
      data: browseClassGradeSWR.data?.data.data,
      refresh: browseClassGradeSWR.mutate,
      pagination: browseClassGradeSWR.pagination,
      filter: browseClassGradeSWR.filter,
      sort: browseClassGradeSWR.sort,
    },

    isLoading: {
      browse: browseClassGradeSWR.isLoading,
    },

    error: {
      browse: browseClassGradeSWR.error,
    },
  };
};

export default useViewClassGrades;
