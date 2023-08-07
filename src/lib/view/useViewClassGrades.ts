import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseClassGrade } from './fetchers';

export type ClassGradesSchema = components['schemas']['pydantic__dataclasses__Grade'];

const useViewClassGrades = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ClassGradesSchema>();

  const browseClassGradeSWR = useSWRWithBrowseParams(`/class/{class_id}/view/grade`, browseClassGrade, {
    class_id: classId,
  });

  return {
    grades: browseClassGradeSWR.data?.data.data,

    isLoading: {
      browse: browseClassGradeSWR.isLoading,
    },

    error: {
      browse: browseClassGradeSWR.error,
    },
  };
};

export default useViewClassGrades;
