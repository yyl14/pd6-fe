import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browsePeerReviewSummaryReview } from './fetchers';

export type PeerReviewSummaryReviewSchema = components['schemas']['view_peer_review_summary_review_return'];

const useViewPeerReviewReviewerSummary = (peerReviewId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewSummaryReviewSchema>();

  const browsePeerReviewSummaryReviewSWR = useSWRWithBrowseParams(
    `/peer-review/{peer_review_id}/view/reviewer-summary`,
    browsePeerReviewSummaryReview,
    { peer_review_id: peerReviewId },
  );

  return {
    peerReviewSummaryReview: browsePeerReviewSummaryReviewSWR.data?.data.data,

    isLoading: {
      browse: browsePeerReviewSummaryReviewSWR.isLoading,
    },

    error: {
      browse: browsePeerReviewSummaryReviewSWR.error,
    },
  };
};

export default useViewPeerReviewReviewerSummary;
