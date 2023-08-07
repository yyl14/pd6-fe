import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browsePeerReviewSummarryReceive } from './fetchers';

export type PeerReviewSummaryRecieveSchema = components['schemas']['view_peer_review_summary_receive_return'];

const useViewPeerReviewRecieverSummary = (peerReviewId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewSummaryRecieveSchema>();

  const browsePeerReviewSummarryReceiveSWR = useSWRWithBrowseParams(
    `/peer-review/{peer_review_id}/view/receiver-summary`,
    browsePeerReviewSummarryReceive,
    { peer_review_id: peerReviewId },
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
