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

import CodingProblem from './CodingProblem';
import EssayAdd from './EssayAdd';
import EssaySetting from './EssaySetting';
import { readProblem, readProblemInfo } from '../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
/* judge the problem type on this level */
export default function Problem() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const problem = useSelector((state) => state.problem.byId);
  // const problemIDs = useSelector((state) => state.problem.allIds);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(readProblemInfo(authToken, problemId, challengeId));
  // }, [authToken, dispatch, problemId, challengeId]);
  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }

  if (loading.readProblem) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        this is problem
      </Typography>
      <EssaySetting />
    </>
  );
}
