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
  const {
    courseId, classId,
  } = useParams();
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

  if (
    courses[courseId] === undefined
    || classes[classId] === undefined
  ) {
    if (commonLoading.fetchCourse || commonLoading.fetchClass) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${courses[courseId].name} ${allClass[classId].name}/ Submission`}
      </Typography>
      <AutoTable
        ident="Class Submission Table"
        hasFilter
        filterConfig={[
          // {
          //   reduxStateId: 'id',
          //   label: 'ID',
          //   type: '',
          //   operation: 'LIKE',
          // },
          // {
          //   reduxStateId: 'request_method',
          //   label: 'Request Method',
          //   type: 'ENUM',
          //   operation: 'IN',
          //   options: [
          //     { value: 'GET', label: 'GET' },
          //     { value: 'POST', label: 'POST' },
          //     { value: 'PUT', label: 'PUT' },
          //     { value: 'PATCH', label: 'PATCH' },
          //     { value: 'DELETE', label: 'DELETE' },
          //   ],
          // },
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

          // TODO account id ?
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
            type: 'link',
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
          Username: {
            text: accounts.byId[item.account_id] ? accounts.byId[item.account_id].username : '',
            path: `/admin/account/account/${item.account_id}/setting`,
          },
          'Student ID': accounts.byId[item.account_id] ? accounts.byId[item.account_id].student_id : '',
          'Real Name': accounts.byId[item.account_id] ? accounts.byId[item.account_id].real_name : '',
          IP: item.ip,
          'Resource Path': item.resource_path,
          'Request Method': item.request_method,
          'Access Time': moment(item.access_time).format('YYYY-MM-DD, HH:mm:ss'),
        })}
      />
    </>
  );
}
