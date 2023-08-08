import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { deletePeerReview, editPeerReview, readPeerReview } from './fetchers';

const usePeerReview = (peerReviewId: number) => {
  const readPeerReviewSWR = useSWR(`/peer-review/${peerReviewId}`, () =>
    readPeerReview({ peer_review_id: peerReviewId }),
  );
  const editPeerReviewSWR = useSWRMutation(`/peer-review/${peerReviewId}`, toSWRFetcher(editPeerReview));
  const deletePeerReviewSWR = useSWRMutation(`/peer-review/${peerReviewId}`, () =>
    deletePeerReview({ peer_review_id: peerReviewId }),
  );

  return {
    peerReview: readPeerReviewSWR.data?.data.data,
    editPeerReview: editPeerReviewSWR.trigger,
    deletePeerReview: deletePeerReviewSWR.trigger,
    isLoading: {
      read: readPeerReviewSWR.isLoading,
      edit: editPeerReviewSWR.isMutating,
      delete: deletePeerReviewSWR.isMutating,
    },
    error: {
      read: readPeerReviewSWR.error,
      edit: editPeerReviewSWR.error,
      delete: deletePeerReviewSWR.error,
    },
  };
};

export default usePeerReview;
