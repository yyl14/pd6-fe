import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseProblemSetUnderClass } from './fetchers';

export type ProblemSetSchema = components['schemas']['ViewProblemSet'];

const useViewClassProblemSets = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ProblemSetSchema>();

  const browseProblemSetUnderClassSWR = useSWRWithBrowseParams(
    `/class/{class_id}/view/problem-set`,
    browseProblemSetUnderClass,
    { class_id: classId },
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
