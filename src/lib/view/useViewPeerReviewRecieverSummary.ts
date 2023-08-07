import useSWRWithBrowseParams from 'swr';
import { browsePeerReviewSummarryReceive } from './fetchers';

const useViewPeerReviewRecieverSummary = (peerReviewId: number) => {
  const browsePeerReviewSummarryReceiveSWR = useSWRWithBrowseParams(
    `/peer-review/{peer_review_id}/view/receiver-summary`,
    () => browsePeerReviewSummarryReceive({ peer_review_id: peerReviewId }),
  );

  return {
    peerReviewSummaryReview: browsePeerReviewSummarryReceiveSWR.data?.data.data,

    isLoading: {
      browse: browsePeerReviewSummarryReceiveSWR.isLoading,
    },

    error: {
      browse: browsePeerReviewSummarryReceiveSWR.error,
    },
  };
};

export default useViewPeerReviewRecieverSummary;
