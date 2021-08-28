import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography, makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import moment from 'moment';

import { nanoid } from 'nanoid';
import DateRangePicker from '../../../ui/DateRangePicker';
import { fetchClass, fetchCourse, fetchAllChallengesProblems } from '../../../../actions/common/common';
import { fetchClassSubmissions } from '../../../../actions/myClass/submission';
import AutoTable from '../../../ui/AutoTable';

import NoMatch from '../../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  paper: {
    minWidth: '800px',
    minHeight: '550px',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionList() {
  const { courseId, classId } = useParams();
  const classes = useStyles();
  const allClass = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const loading = useSelector((state) => state.loading.myClass.submissions);
  const commonLoading = useSelector((state) => state.loading.common);
  const submissions = useSelector((state) => state.submissions);
  const authToken = useSelector((state) => state.auth.token);
  const accounts = useSelector((state) => state.accounts);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);
  const judgments = useSelector((state) => state.judgments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchAllChallengesProblems(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  if (courses[courseId] === undefined || allClass[classId] === undefined) {
    if (commonLoading.fetchCourse || commonLoading.fetchClass) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }
  // console.log('classes: ', allClass);
  // console.log('challenges: ', challenges);
  // console.log('problems: ', problems);
  // console.log('submissions: ', submissions);
  // console.log('judgments: ', judgments);
  // console.log('accounts', accounts);

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${courses[courseId].name} ${allClass[classId].name} / Submission`}
      </Typography>
      <AutoTable
        ident="Class Submission Table"
        hasFilter={false}
        filterConfig={[
          // {
          //   reduxStateId: 'id',
          //   label: 'ID',
          //   type: '',
          //   operation: 'LIKE',
          // },
          {
            reduxStateId: 'status',
            label: 'Status',
            type: 'ENUM',
            operation: 'IN',
            options: [
              { value: 'Accepted', label: 'Accepted' },
              { value: 'Wrong Answer', label: 'Wrong Answer' },
              { value: 'Memory Limit Exceed', label: 'Memory Limit Exceed' },
              { value: 'Time Limit Exceed', label: 'Time Limit Exceed' },
              { value: 'Runtime Error', label: 'Runtime Error' },
              { value: 'Compile Error', label: 'Compile Error' },
              { value: 'Other - Contact Staff', label: 'Other - Contact Staff' },
              { value: 'Restricted function', label: 'Restricted function' },
              { value: 'System Error', label: 'System Error' },
              { value: 'Waiting for Judge', label: 'Waiting for Judge' },
            ],
          },
          // {
          //   reduxStateId: 'resource_path',
          //   label: 'Resource Path',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
          // {
          //   reduxStateId: 'ip',
          //   label: 'IP',
          //   type: 'TEXT',
          //   operation: 'LIKE',
          // },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(fetchClassSubmissions(authToken, browseParams, ident, classId));
        }}
        columns={[
          {
            name: 'ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Username',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Student ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Real Name',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Challenge',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Problem',
            align: 'center',
            type: 'link',
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={submissions}
        reduxDataToRows={(item) => ({
          id: item.id,
          ID: item.id,
          Username: accounts.byId[item.account_id] ? accounts.byId[item.account_id].username : '',
          'Student ID': accounts.byId[item.account_id] ? accounts.byId[item.account_id].student_id : '',
          'Real Name': accounts.byId[item.account_id] ? accounts.byId[item.account_id].real_name : '',
          Challenge: {
            text:
              problems.byId[item.problem_id] && challenges.byId[problems.byId[item.problem_id].challenge_id]
                ? challenges.byId[problems.byId[item.problem_id].challenge_id].title
                : '',
            path: problems.byId[item.problem_id]
              ? `/my-class/${courseId}/${classId}/challenge/${problems.byId[item.problem_id].challenge_id}`
              : '',
          },
          Problem: {
            text: problems.byId[item.problem_id] ? problems.byId[item.problem_id].challenge_label : '',
            path: problems.byId[item.problem_id]
              ? `/my-class/${courseId}/${classId}/challenge/${problems.byId[item.problem_id].challenge_id}/${
                item.problem_id
              }`
              : '',
          },
          Status: judgments.allIds.filter((key) => judgments.byId[key].submission_id === item.id)[0]
            ? judgments.byId[judgments.allIds.filter((key) => judgments.byId[key].submission_id === item.id)[0]].status
            : 'No Status',
          Time: moment(item.submit_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/my-class/${courseId}/${classId}/submission/${item.id}`,
        })}
        hasLink
      />
    </>
  );
}
