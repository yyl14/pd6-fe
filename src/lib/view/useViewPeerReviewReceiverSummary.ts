import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browsePeerReviewSummaryReceive } from './fetchers';

export type PeerReviewSummaryReceiveSchema = components['schemas']['pydantic__dataclasses__ViewPeerReviewRecord'];

const useViewPeerReviewReceiverSummary = (peerReviewId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewSummaryReceiveSchema>();

  const browsePeerReviewSummaryReceiveSWR = useSWRWithBrowseParams(
    `/peer-review/${peerReviewId}/view/receiver-summary`,
    browsePeerReviewSummaryReceive,
    { peer_review_id: peerReviewId },
  );

  return {
    browsePeerReviewSummaryReceive: {
      data: browsePeerReviewSummaryReceiveSWR.data?.data.data,
      refresh: browsePeerReviewSummaryReceiveSWR.mutate,
      pagination: browsePeerReviewSummaryReceiveSWR.pagination,
      filter: browsePeerReviewSummaryReceiveSWR.filter,
      sort: browsePeerReviewSummaryReceiveSWR.sort,
    },

    isLoading: {
      browse: browsePeerReviewSummaryReceiveSWR.isLoading,
    },

    error: {
      browse: browsePeerReviewSummaryReceiveSWR.error,
    },
  };
};

export default useViewPeerReviewReceiverSummary;
