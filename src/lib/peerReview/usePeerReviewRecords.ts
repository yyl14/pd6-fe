import useSWRMutation from 'swr/mutation';

import { withDataSchema } from '@/hooks/useSWRWithBrowseParams';
import { assignPeerReviewRecord, browsePeerReviewRecord } from '@/lib/peerReview/fetchers';

import { components } from '../../../types/schema';

export type PeerReviewRecordsSchema = components['schemas']['BrowsePeerReviewRecordData'];

const usePeerReviewRecords = (peerReviewId: number) => {
  const useSWRWithBrowseParams = withDataSchema<PeerReviewRecordsSchema>();
  const browsePeerReviewRecordSWR = useSWRWithBrowseParams(
    `/peer-review/${peerReviewId}/record`,
    browsePeerReviewRecord,
    { peer_review_id: peerReviewId },
    {},
  );

  const assignPeerReviewRecordSWR = useSWRMutation(`/peer-review/${peerReviewId}/record`, () =>
    assignPeerReviewRecord({ peer_review_id: peerReviewId }),
  );

  return {
    peerReviewRecords: browsePeerReviewRecordSWR.data?.data.data,
    assignPeerReviewRecord: assignPeerReviewRecordSWR.trigger,
    isLoading: {
      assignPeerReviewRecord: assignPeerReviewRecordSWR.isMutating,
    },
    error: {
      assignPeerReviewRecord: assignPeerReviewRecordSWR.error,
    },
  };
};

export default usePeerReviewRecords;
