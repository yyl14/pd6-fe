import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { readPeerReviewRecord, submitPeerReviewRecord } from './fetchers';

const usePeerReviewRecord = (peerReviewRecordId: number) => {
  const readPeerReviewRecordSWR = useSWR(`/peer-review-record/${peerReviewRecordId}`, () =>
    readPeerReviewRecord({ peer_review_record_id: peerReviewRecordId }),
  );
  const submitPeerReviewRecordSWR = useSWRMutation(
    `/peer-review-record/${peerReviewRecordId}`,
    toSWRFetcher(submitPeerReviewRecord),
  );

  return {
    peerReviewRecord: readPeerReviewRecordSWR.data?.data.data,
    submitPeerReviewRecord: submitPeerReviewRecordSWR.trigger,
    isLoading: {
      read: readPeerReviewRecordSWR.isLoading,
      submit: submitPeerReviewRecordSWR.isMutating,
    },
    error: {
      read: readPeerReviewRecordSWR.error,
      submit: submitPeerReviewRecordSWR.error,
    },
  };
};

export default usePeerReviewRecord;
