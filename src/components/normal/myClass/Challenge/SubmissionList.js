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

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        this is challenge list
      </Typography>
    </>
  );
}
