import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useViewPeerReviewReviewerSummary from '@/lib/view/useViewPeerReviewReviewerSummary';

const PeerReviewGraderSummary = lazy(() => import('@/pages/PeerReviewGraderSummary'));

export default function PeerReviewGraderSummaryRoute() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { courseId, classId, challengeId, peerReviewId, isNull } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    peerReviewId: string;
    accountId: string;
    recordId: string;
    isNull: string;
  }>();
  const { isLoading } = useViewPeerReviewReviewerSummary(Number(peerReviewId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(PeerReviewGraderSummary)({
        courseId,
        classId,
        challengeId,
        peerReviewId,
        isNull,
        isLoading: isLoading.browse,
      })}
    </Suspense>
  );
}
