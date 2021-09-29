import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { readPeerReview, readPeerReviewRecord } from '../../../../../actions/api/peerReview';

import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

const useStyles = makeStyles(() => ({
}));

/* This is a level 4 component (page component) */
// This page is only for class normal.
export default function PeerReviewRecord() {
  const {
    classId, challengeId, peerReviewId, recordId,
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

  useEffect(() => {
    const newRole = userClasses.filter((item) => item.class_id === Number(classId))[0].role;
    if (newRole !== null || newRole !== undefined) {
      setRole(newRole);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    dispatch(readPeerReview(authToken, peerReviewId));
    dispatch(readPeerReviewRecord(authToken, recordId));
  }, [authToken, dispatch, peerReviewId, recordId]);

  if (peerReviews[peerReviewId] === undefined || peerReviewRecords[recordId] === undefined) {
    if (loading.readPeerReview || loading.readPeerReviewRecord) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <div>PeerReviewRecord</div>
    </>
  );
}
