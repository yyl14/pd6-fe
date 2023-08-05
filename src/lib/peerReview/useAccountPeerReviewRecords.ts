import useSWR from 'swr';
import { browseAccountReceivedPeerReviewRecord, browseAccountReviewedPeerReviewRecord } from './fetchers';

const useAccountPeerReviewRecords = (peerReviewId: number, accountId: number) => {
  const browseAccountReceivedPeerReviewRecordSWR = useSWR(
    `/peer-review/{peer_review_id}/account/{account_id}/receive`,
    () => browseAccountReceivedPeerReviewRecord({ peer_review_id: peerReviewId, account_id: accountId }),
  );
  const browseAccountReviewedPeerReviewRecordSWR = useSWR(
    '/peer-review/{peer_review_id}/account/{account_id}/review',
    () => browseAccountReviewedPeerReviewRecord({ peer_review_id: peerReviewId, account_id: accountId }),
  );

  return {
    accountReceivedPeerReviewRecord: browseAccountReceivedPeerReviewRecordSWR.data?.data.data,
    accountReviewedPeerReviewRecord: browseAccountReviewedPeerReviewRecordSWR.data?.data.data,
    isLoading: {
      browseAccountReceivedPeerReviewRecord: browseAccountReceivedPeerReviewRecordSWR.isLoading,
      browseAccountReviewedPeerReviewRecord: browseAccountReviewedPeerReviewRecordSWR.isLoading,
    },
    error: {
      browseAccountReceivedPeerReviewRecord: browseAccountReceivedPeerReviewRecordSWR.error,
      browseAccountReviewedPeerReviewRecord: browseAccountReviewedPeerReviewRecordSWR.error,
    },
  };
};

export default useAccountPeerReviewRecords;
