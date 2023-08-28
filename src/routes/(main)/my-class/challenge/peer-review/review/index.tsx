import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecord from '@/lib/peerReview/usePeerReviewRecord';

const PeerReviewReviewedRecord = lazy(() => import('@/pages/PeerReviewReviewedRecord'));

export default function PeerReviewReviewedRecordRoute() {
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
  const { isLoading: peerReviewRecordLoading } = usePeerReviewRecord(Number(recordId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(PeerReviewReviewedRecord)({
        courseId,
        classId,
        challengeId,
        peerReviewId,
        accountId,
        recordId,
        isLoading: challengeLoading.read || peerReviewLoading.read || peerReviewRecordLoading.read,
      })}
    </Suspense>
  );
}
