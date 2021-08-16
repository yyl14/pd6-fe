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
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function CodingProblem() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problem = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  console.log(problem);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {problem.challenge_label}
        {' '}
        /
        {' '}
        {problem.title}
      </Typography>
      <div>
        <Button variant="outlined" color="primary" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`)} startIcon={<Icon.HistoryIcon />}>My Submission</Button>
        <Button color="primary" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/code-submission`)}>Submit</Button>
      </div>
      <SimpleBar title="Title">{problem.title}</SimpleBar>
      <SimpleBar title="Description">{problem.description}</SimpleBar>
      <SimpleBar title="About Input">I do not know where to get this info.</SimpleBar>
      <SimpleBar title="About Output">I do not know where to get this info.</SimpleBar>
      <SimpleBar title="Sample">找零錢</SimpleBar>
      <SimpleBar title="Testing Data">找零錢</SimpleBar>
    </>
  );
}
