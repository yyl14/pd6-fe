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
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import NoMatch from '../../../noMatch';
import { readSubmissionDetail } from '../../../../actions/myClass/problem';

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

  const submissions = useSelector((state) => state.submissions.byId);
  const judgments = useSelector((state) => state.judgments);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);

  const account = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readSubmissionDetail(authToken, submissionId, challengeId, problemId));
  }, [authToken, challengeId, dispatch, problemId, submissionId]);

  if (problems.byId[problemId] === undefined || challenges.byId[challengeId] === undefined) {
    return <NoMatch />;
  }

  // if (error.readSubmission) {
  //   console.log(error.readSubmission);
  //   return (<div>{error.readSubmission}</div>);
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {submissionId}
        {' '}
        / Submission Detail
      </Typography>
      <SimpleBar title="Submission Information">
        <AlignedText text="Submission ID" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Username" childrenType="text">
          <Typography variant="body1">{account.username}</Typography>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{account.real_name}</Typography>
        </AlignedText>
        <AlignedText text="Challenge" childrenType="text">
          <Typography variant="body1">{challenges.byId[challengeId].title}</Typography>
        </AlignedText>
        <AlignedText text="Task Label" childrenType="text">
          <Typography variant="body1">{problems.byId[problemId].challenge_label}</Typography>
        </AlignedText>
        <AlignedText text="Task Title" childrenType="text">
          <Typography variant="body1">{problems.byId[problemId].title}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Score" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Submit Time" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Language" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
      </SimpleBar>
      <SimpleBar title="Submission Result" />
      <SimpleBar title="Code" />
    </>
  );
}
