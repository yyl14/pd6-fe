import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import usePeerReviewRecords from '@/lib/peerReview/usePeerReviewRecords';
import PeerReviewGraderSummaryRoute from '@/routes/(main)/my-class/challenge/peer-review/grader-summary';
import PeerReviewReceivedRecordRoute from '@/routes/(main)/my-class/challenge/peer-review/receive';
import PeerReviewReceiverSummaryRoute from '@/routes/(main)/my-class/challenge/peer-review/receiver-summary';
import PeerReviewReviewedRecordRoute from '@/routes/(main)/my-class/challenge/peer-review/review';

const PeerReview = lazy(() => import(/* webpackChunkName: "PeerReview" */ '@/pages/PeerReview'));

export function PeerReviewRoute() {
  const { courseId, classId, challengeId, peerReviewId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    peerReviewId: string;
  }>();
  const { isLoading: peerReviewLoading } = usePeerReview(Number(peerReviewId));
  const { isLoading: peerReviewRecordsLoading } = usePeerReviewRecords(Number(peerReviewId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(PeerReview)({
        courseId,
        classId,
        challengeId,
        peerReviewId,
        // extract from line 140 from components/normal/myClass/Challenge/PeerReview/PeerReviewInfo.js
        isLoading: peerReviewLoading.read || peerReviewLoading.edit || peerReviewRecordsLoading.assignPeerReviewRecord,
      })}
    </Suspense>
  );
}

export default function PeerReviewRoutes() {
  return (
    <Switch>
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/receive/:accountId/:recordId"
        component={PeerReviewReceivedRecordRoute}
      />

      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/review/:accountId/:recordId"
        component={PeerReviewReviewedRecordRoute}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/grader-summary/:isNull?"
        component={PeerReviewGraderSummaryRoute}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/receiver-summary/:isNull?"
        component={PeerReviewReceiverSummaryRoute}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId"
        component={PeerReviewRoute}
      />
    </Switch>
  );
}
