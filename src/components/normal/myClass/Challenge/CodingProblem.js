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
        <Button variant="outlined" color="primary" startIcon={<Icon.HistoryIcon />}>My Submission</Button>
        <Button color="primary">Submit</Button>
      </div>
      <SimpleBar title="Title">找零錢</SimpleBar>
      <SimpleBar title="Description">Description</SimpleBar>
      <SimpleBar title="About Input">找零錢</SimpleBar>
      <SimpleBar title="About Output">找零錢</SimpleBar>
      <SimpleBar title="Sample">找零錢</SimpleBar>
      <SimpleBar title="Testing Data">找零錢</SimpleBar>
    </>
  );
}
