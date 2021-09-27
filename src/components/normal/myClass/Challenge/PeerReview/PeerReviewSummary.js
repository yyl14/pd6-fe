import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';

import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

const useStyles = makeStyles(() => ({
}));

/* This is a level 4 component (page component) */
// This page is only for class manager.
export default function PeerReviewSummary() {
  const {
    classId, challengeId, peerReviewId,
  } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [role, setRole] = useState('GUEST');

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.api.peerReviews);
  const error = useSelector((state) => state.error.api.peerReviews);
  const commonLoading = useSelector((state) => state.loading.common.common);
  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const peerReviewRecords = useSelector((state) => state.peerReviewRecords.byId);

  // if (peerReviews[peerReviewId] === undefined) {
  //   return <NoMatch />;
  // }

  return (
    <>
      <div>PeerReviewSummary</div>
    </>
  );
}
