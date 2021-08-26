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
import SimpleTable from '../../../ui/SimpleTable';
import SampleTestArea from '../../../ui/SampleTestArea';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';

import CodingProblemInfo from './ProblemSettings/CodingProblemInfo';
import CodingProblemEdit from './ProblemSettings/CodingProblemEdit';
import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  sampleArea: {
    marginTop: '50px',
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
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

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const commonLoading = useSelector((state) => state.loading.common);

  if (
    problems[problemId] === undefined
    || challenges[challengeId] === undefined
    || courses[courseId] === undefined
    || classes[classId] === undefined
  ) {
    if (commonLoading.fetchCourse || commonLoading.fetchClass) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${challenges[challengeId] === undefined ? 'error' : challenges[challengeId].title} / ${
          problems[problemId] === undefined ? 'error' : problems[problemId].challenge_label
        }`}
      </Typography>
      <div className={classNames.generalButtons}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`)}
          startIcon={<Icon.HistoryIcon />}
        >
          My Submission
        </Button>
        <Button
          color="primary"
          onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/code-submission`)}
        >
          Submit
        </Button>
      </div>
      <CodingProblemInfo />
    </>
  );
}
