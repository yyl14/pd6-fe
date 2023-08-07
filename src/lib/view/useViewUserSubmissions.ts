import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browseMySubmission } from './fetchers';

export type PeerReviewSummaryReviewSchema = components['schemas']['view_peer_review_summary_review_return'];

const useViewUserSubmissions = (accountId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewSummaryReviewSchema>();

  const browseMySubmissionSWR = useSWRWithBrowseParams(`/view/my-submission`, browseMySubmission, {
    account_id: accountId,
  });

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
