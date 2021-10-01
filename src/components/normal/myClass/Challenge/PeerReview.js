import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useParams } from 'react-router-dom';

import GeneralLoading from '../../../GeneralLoading';
import PeerReviewInfo from './PeerReviewSettings/PeerReviewInfo';
import ReceiverSummary from './PeerReviewSettings/ReceiverSummary';
import GraderSummary from './PeerReviewSettings/GraderSummary';
import ReviewedRecord from './PeerReviewSettings/ReviewedRecord';
import ReceivedRecord from './PeerReviewSettings/ReceivedRecord';
import NoMatch from '../../../noMatch';

/* This is a level 4 component (page component) */
/* judge the problem type on this level */
export default function PeerReview() {
  const { courseId, classId, challengeId } = useParams();

  // const problemIDs = useSelector((state) => state.problem.allIds);
  // const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  // const loading = useSelector((state) => state.loading.myClass.problem);
  const commonLoading = useSelector((state) => state.loading.common);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const challenges = useSelector((state) => state.challenges.byId);

  // const dispatch = useDispatch();
  if (challenges[challengeId] === undefined || courses[courseId] === undefined || classes[classId] === undefined) {
    if (commonLoading.fetchCourse || commonLoading.fetchClass || commonLoading.fetchChallenge) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Switch>
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId" component={PeerReviewInfo} />
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/receiver-summary" component={ReceiverSummary} />
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/grader-summary" component={GraderSummary} />
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/receive/:accountId/:recordId" component={ReceivedRecord} />
        <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/peer-review/:peerReviewId/review/:accountId/:recordId" component={ReviewedRecord} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
