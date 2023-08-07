import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseMySubmissionUnderProblem } from './fetchers';

export type MySubmissionUnderProblemSchema = components['schemas']['view_browse_my_submission_under_problem_return'];

const useViewProblemUserSubmissions = (accountId: number, problemId: number) => {
  const useSWRWithBrowseParams = withDataSchema<MySubmissionUnderProblemSchema>();

  const browseMySubmissionUnderProblemSWR = useSWRWithBrowseParams(
    `/problem/{problem_id}/view/my-submission`,
    browseMySubmissionUnderProblem,
    { account_id: accountId, problem_id: problemId },
  );

  return {
    submissions: browseMySubmissionUnderProblemSWR.data?.data.data,

    isLoading: {
      browse: browseMySubmissionUnderProblemSWR.isLoading,
    },

    error: {
      browse: browseMySubmissionUnderProblemSWR.error,
    },
  };
};

export default useViewProblemUserSubmissions;
