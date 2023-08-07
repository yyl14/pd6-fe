import useSWRWithBrowseParams from 'swr';
import { browseProblemSetUnderClass } from './fetchers';

const useViewClassProblemSets = (classId: number) => {
  const browseProblemSetUnderClassSWR = useSWRWithBrowseParams(`/class/{class_id}/view/problem-set`, () =>
    browseProblemSetUnderClass({ class_id: classId }),
  );

  return {
    problemSets: browseProblemSetUnderClassSWR.data?.data.data,

    isLoading: {
      browse: browseProblemSetUnderClassSWR.isLoading,
    },

    error: {
      browse: browseProblemSetUnderClassSWR.error,
    },
  };
};

export default useViewClassProblemSets;
