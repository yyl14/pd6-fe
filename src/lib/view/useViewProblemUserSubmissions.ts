import useSWR from 'swr';
import { browseMySubmissionUnderProblem } from './fetchers';

const useViewProblemUserSubmissions = () => {
  const browseMySubmissionUnderProblemSWR = useSWR(
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
