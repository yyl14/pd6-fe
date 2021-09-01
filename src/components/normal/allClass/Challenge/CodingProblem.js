import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import Icon from '../../../ui/icon/index';

import CodingProblemInfo from './ProblemSettings/CodingProblemInfo';
import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles(() => ({
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

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const commonLoading = useSelector((state) => state.loading.common);

  if (
    problems[problemId] === undefined
    || challenges[challengeId] === undefined
    || courses[courseId] === undefined
    || classes[classId] === undefined
  ) {
    if (commonLoading.fetchCourse || commonLoading.fetchClass) {
      return <GeneralLoading />;
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
          onClick={() => history.push(`/all-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`)}
          startIcon={<Icon.HistoryIcon />}
        >
          My Submission
        </Button>
        <Button
          color="primary"
          onClick={() => history.push(`/all-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/code-submission`)}
        >
          Submit
        </Button>
      </div>
      <CodingProblemInfo />
    </>
  );
}
