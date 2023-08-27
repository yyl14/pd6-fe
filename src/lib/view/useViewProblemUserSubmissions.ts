import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import useUserId from '../user/useUserId';
import { browseMySubmissionUnderProblem } from './fetchers';

export type MySubmissionUnderProblemSchema = components['schemas']['ViewMySubmissionUnderProblem'];

const useViewProblemUserSubmissions = (problemId: number) => {
  const userId = useUserId();
  const useSWRWithBrowseParams = withDataSchema<MySubmissionUnderProblemSchema>();

  const browseMySubmissionUnderProblemSWR = useSWRWithBrowseParams(
    `/problem/${problemId}/view/my-submission`,
    browseMySubmissionUnderProblem,
    { account_id: userId, problem_id: problemId },
  );

  return {
    browseSubmission: {
      data: browseMySubmissionUnderProblemSWR.data?.data.data.data,
      refresh: browseMySubmissionUnderProblemSWR.mutate,
      pagination: browseMySubmissionUnderProblemSWR.pagination,
      filter: browseMySubmissionUnderProblemSWR.filter,
      sort: browseMySubmissionUnderProblemSWR.sort,
    },

    isLoading: {
      browse: browseMySubmissionUnderProblemSWR.isLoading || browseMySubmissionUnderProblemSWR.isValidating,
    },

    error: {
      browse: browseMySubmissionUnderProblemSWR.error,
    },
  };
};

export default useViewProblemUserSubmissions;
