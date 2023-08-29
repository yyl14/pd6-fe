import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useAccountPeerReviewRecords from '@/lib/peerReview/useAccountPeerReviewRecords';
import usePeerReview from '@/lib/peerReview/usePeerReview';

const PeerReviewReceivedRecord = lazy(() => import('@/pages/PeerReviewReceivedRecord'));

export default function PeerReviewReceivedRecordRoute() {
  const { courseId, classId, challengeId, peerReviewId, accountId, recordId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    peerReviewId: string;
    accountId: string;
    recordId: string;
  }>();
  const { isLoading: challengeLoading } = useChallenge(Number(challengeId));
  const { isLoading: peerReviewLoading } = usePeerReview(Number(peerReviewId));
  const { isLoading: peerReviewRecordLoading } = useAccountPeerReviewRecords(Number(peerReviewId), Number(accountId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(PeerReviewReceivedRecord)({
        courseId,
        classId,
        peerReviewId,
        accountId,
        recordId,
        isLoading:
          challengeLoading.read ||
          peerReviewLoading.read ||
          peerReviewRecordLoading.browseAccountReceivedPeerReviewRecord,
      })}
    </Suspense>
  );
}
