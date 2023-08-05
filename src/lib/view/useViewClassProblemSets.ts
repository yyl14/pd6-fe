import useSWR from 'swr';
import { browseProblemSetUnderClass } from './fetchers';

const useViewClassProblemSets = (classId: number) => {
  const browseProblemSetUnderClassSWR = useSWR(`/class/{class_id}/view/problem-set`, () =>
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
