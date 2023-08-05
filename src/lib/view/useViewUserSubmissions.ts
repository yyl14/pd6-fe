import useSWR from 'swr';
import { browseMySubmission } from './fetchers';

const useViewUserSubmissions = () => {
  const browseMySubmissionSWR = useSWR(`/view/my-submission`, browseMySubmission);

  return {
    submissions: browseMySubmissionSWR.data?.data.data,

    isLoading: {
      browse: browseMySubmissionSWR.isLoading,
    },

    error: {
      browse: browseMySubmissionSWR.error,
    },
  };
};

export default useViewUserSubmissions;
