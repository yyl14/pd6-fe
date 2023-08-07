import useSWRWithBrowseParams from 'swr';
import { browsePeerReviewSummaryReview } from './fetchers';

const useViewPeerReviewReviewerSummary = (peerReviewId: number) => {
  const browsePeerReviewSummaryReviewSWR = useSWRWithBrowseParams(
    `/peer-review/{peer_review_id}/view/reviewer-summary`,
    () => browsePeerReviewSummaryReview({ peer_review_id: peerReviewId }),
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
