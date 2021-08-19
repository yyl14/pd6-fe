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

import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionList() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  // if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {

  //   return <NoMatch />;
  // }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {problemId}
        {' '}
        / My Submission
      </Typography>
      <AlignedText text="Latest Score" childrenType="text">
        <Typography variant="body1">N/A</Typography>
      </AlignedText>
      <CustomTable
        hasSearch={false}
        buttons={(
          <>
            <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />}>
              Refresh
            </Button>
          </>
        )}
        data={[]}
        columns={[
          {
            id: 'Status',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 100,
            type: 'string',
          },
          {
            id: 'Score',
            label: 'Score',
            minWidth: 50,
            align: 'center',
            width: 100,
            type: 'string',
          },
          {
            id: 'used_time',
            label: 'Used Time(ms)',
            minWidth: 50,
            align: 'center',
            width: 140,
            type: 'string',
          },
          {
            id: 'used_memory',
            label: 'Used Memory(kb)',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
          {
            id: 'submit_time',
            label: 'Submit Time',
            minWidth: 50,
            align: 'center',
            width: 150,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
    </>
  );
}
