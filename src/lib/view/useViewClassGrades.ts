import useSWRWithBrowseParams from 'swr';
import { browseClassGrade } from './fetchers';

const useViewClassGrades = (classId: number) => {
  const browseClassGradeSWR = useSWRWithBrowseParams(`/class/{class_id}/view/grade`, () =>
    browseClassGrade({ class_id: classId }),
  );

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
