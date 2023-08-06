import useSWRMutation from 'swr/mutation';
import { assignPeerReviewRecord } from './fetchers';

const usePeerReviewRecords = (peerReviewId: number) => {
  const assignPeerReviewRecordSWR = useSWRMutation(`/peer-review/${peerReviewId}/record`, () =>
    assignPeerReviewRecord({ peer_review_id: peerReviewId }),
  );

  return {
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
