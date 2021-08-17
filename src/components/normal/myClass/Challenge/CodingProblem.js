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
  buttons: {
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

  const user = useSelector((state) => state.user.classes);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [edit, setEdit] = useState(false);

  // console.log(problems[problemId]);
  if (problems[problemId] === undefined || challenges[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        /
        {' '}
        {problems[problemId].challenge_label}
      </Typography>
      <div>
        <Button color="default" onClick={() => setEdit(true)}>Edit</Button>
        <Button color="default">Rejudge</Button>
      </div>
      <div className={classNames.buttons}>
        <Button variant="outlined" color="primary" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`)} startIcon={<Icon.HistoryIcon />}>My Submission</Button>
        <Button color="primary" onClick={() => history.push(`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/code-submission`)}>Submit</Button>
      </div>
      {edit ? <CodingProblemInfo /> : <CodingProblemEdit setEdit={setEdit()} />}
    </>
  );
}
