import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { readPeerReviewRecord, submitPeerReviewRecord } from './fetchers';

const usePeerReviewRecord = (peerReviewRecordId: number) => {
  const peerReviewRecordSWR = useSWR(`/peer-review-record/${peerReviewRecordId}`, () =>
    readPeerReviewRecord({ peer_review_record_id: peerReviewRecordId }),
  );

  const submitPeerReviewRecordSWR = useSWRMutation(
    `/peer-review-record/${peerReviewRecordId}`,
    toSWRFetcher(submitPeerReviewRecord),
  );

  return {
    peerReviewRecord: peerReviewRecordSWR.data?.data.data,
    submitPeerReviewRecord: submitPeerReviewRecordSWR.trigger,

    isLoading: {
      read: peerReviewRecordSWR.isLoading,
      submit: submitPeerReviewRecordSWR.isMutating,
    },
    error: {
      read: peerReviewRecordSWR.error,
      submit: submitPeerReviewRecordSWR.error,
    },
  };
};

export default usePeerReviewRecord;
