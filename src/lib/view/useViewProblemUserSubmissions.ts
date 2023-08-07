import useSWRWithBrowseParams from 'swr';
import { browseMySubmissionUnderProblem } from './fetchers';

const useViewProblemUserSubmissions = () => {
  const browseMySubmissionUnderProblemSWR = useSWRWithBrowseParams(
    `/problem/{problem_id}/view/my-submission`,
    browseMySubmissionUnderProblem,
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
