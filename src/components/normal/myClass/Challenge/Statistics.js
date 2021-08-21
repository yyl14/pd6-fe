import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Snackbar,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import CustomTable from '../../../ui/CustomTable';
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles((theme) => ({
  bottomSpace: {
    marginBottom: '50px',
  },
  placeholder: {
    height: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function Statistics() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const dispatch = useDispatch();
  const [statData, setStatData] = useState([
    {
      task: 'Q1',
      solved_member: 69,
      submission: 80,
      user_tried: 71,
    },
  ]);
  const [scoreData, setScoreData] = useState([
    {
      username: 'shiba',
      account_path: 'account/path',
      student_id: 'b05705046',
      real_name: '黑阿柴',
      total_score: 20,
      Q1: 20,
      Q1_path: 'submission/20',
      Q2: 'pdf',
      Q2_path: 'pdf/20',
    },
  ]);

  // TODO:
  // 1. copy all method
  // 2. wait for BE summary api

  return (
    <>
      <Typography variant="h3" className={classes.bottomSpace}>
        HW4 / Statistics
      </Typography>
      <SimpleBar title="Statistics" />
      <SimpleTable
        data={statData}
        columns={[
          {
            id: 'task',
            label: 'Task',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'solved_member',
            label: 'Solved Member',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'submission',
            label: 'Submission',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'user_tried',
            label: 'User Tried',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
        ]}
      />
      <div className={classes.placeholder} />
      <SimpleBar title="Scoreboard" />
      <CustomTable
        hasSearch
        searchPlaceholder="Username / Student ID / Real Name"
        buttons={(
          <>
            <Button onClick={() => setShowSnackbar(true)}><Icon.Copy /></Button>
          </>
        )}
        data={scoreData}
        columns={[
          {
            id: 'username',
            label: 'Username',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'link',
            link_id: 'account_path',
          },
          {
            id: 'student_id',
            label: 'Student ID',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'string',
          },
          {
            id: 'real_name',
            label: 'Real Name',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'string',
          },
          {
            id: 'total_score',
            label: 'Total Score',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'string',
          },
          {
            id: 'Q1',
            label: 'Q1',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'link',
            link_id: 'Q1_path',
          },
          {
            id: 'Q2',
            label: 'Q2',
            minWidth: 150,
            align: 'center',
            width: 500,
            type: 'link',
            link_id: 'Q2_path',
          },
        ]}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        message="Entire table is copied to clipboard."
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}
