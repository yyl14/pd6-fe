import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseProblemSetUnderClass } from './fetchers';

export type ProblemSetSchema = components['schemas']['ViewProblemSet'];

const useViewClassProblemSets = (classId: number) => {
  const useSWRWithBrowseParams = withDataSchema<ProblemSetSchema>();

  const browseProblemSetUnderClassSWR = useSWRWithBrowseParams(
    `/class/${classId}/view/problem-set`,
    browseProblemSetUnderClass,
    { class_id: classId },
    { baseSort: { column: 'challenge_id', order: 'ASC' } },
  );

  return {
    browseProblemSetUnderClass: {
      data: browseProblemSetUnderClassSWR.data?.data.data,
      refresh: browseProblemSetUnderClassSWR.mutate,
      pagination: browseProblemSetUnderClassSWR.pagination,
      filter: browseProblemSetUnderClassSWR.filter,
      sort: browseProblemSetUnderClassSWR.sort,
    },

    isLoading: {
      browse: browseProblemSetUnderClassSWR.isLoading,
    },

    error: {
      browse: browseProblemSetUnderClassSWR.error,
    },
  };
};

export default useViewClassProblemSets;
