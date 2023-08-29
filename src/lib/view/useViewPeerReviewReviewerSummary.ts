import { components } from '../../../types/schema';
import { withDataSchema } from '../../hooks/useSWRWithBrowseParams';
import { browsePeerReviewSummaryReview } from './fetchers';

export type PeerReviewSummaryReviewSchema = components['schemas']['pydantic__dataclasses__ViewPeerReviewRecord'];

const useViewPeerReviewReviewerSummary = (peerReviewId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewSummaryReviewSchema>();

  const browsePeerReviewSummaryReviewSWR = useSWRWithBrowseParams(
    `/peer-review/${peerReviewId}/view/reviewer-summary`,
    browsePeerReviewSummaryReview,
    { peer_review_id: peerReviewId },
  );

  return {
    browsePeerReviewSummaryReview: {
      data: browsePeerReviewSummaryReviewSWR.data?.data.data,
      refresh: browsePeerReviewSummaryReviewSWR.mutate,
      pagination: browsePeerReviewSummaryReviewSWR.pagination,
      filter: browsePeerReviewSummaryReviewSWR.filter,
      sort: browsePeerReviewSummaryReviewSWR.sort,
    },

    isLoading: {
      browse: browsePeerReviewSummaryReviewSWR.isLoading,
    },

    error: {
      browse: browsePeerReviewSummaryReviewSWR.error,
    },
  };
};

export default useViewPeerReviewReviewerSummary;
