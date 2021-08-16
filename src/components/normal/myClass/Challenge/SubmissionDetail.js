import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { readSubmissionDetailAll } from '../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionDetail() {
  const {
    courseId, classId, challengeId, problemId, submissionId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const submission = useSelector((state) => state.submissions.byId);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readSubmissionDetailAll(authToken, submissionId));
  }, [authToken, dispatch, submissionId]);

  if (error.readSubmission) {
    console.log(error.readSubmission);
    return (<div>{error.readSubmission}</div>);
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {submissionId}
        {' '}
        / Submission Detail
      </Typography>
    </>
  );
}
