import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useViewPeerReviewReceiverSummary from '@/lib/view/useViewPeerReviewReceiverSummary';

const PeerReviewReceiverSummary = lazy(
  () => import(/* webpackChunkName: "PeerReviewReceiverSummary" */ '@/pages/PeerReviewReceiverSummary'),
);

export default function PeerReviewReceiverSummaryRoute() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { courseId, classId, challengeId, peerReviewId, isNull } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    peerReviewId: string;
    isNull: string;
  }>();
  const { isLoading } = useViewPeerReviewReceiverSummary(Number(peerReviewId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(PeerReviewReceiverSummary)({
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
