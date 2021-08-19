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
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import SimpleTable from '../../../../ui/SimpleTable';
import SampleTestArea from '../../../../ui/SampleTestArea';
import Icon from '../../../../ui/icon/index';

import NoMatch from '../../../../noMatch';

import { browseTestcase, browseAssistingData } from '../../../../../actions/myClass/problem';

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
export default function CodingProblemInfo({ role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problems = useSelector((state) => state.problem.byId);
  const testcases = useSelector((state) => state.testcases.byId);
  const sampleDataIds = problems[problemId] === undefined ? [] : problems[problemId].testcaseIds.filter((id) => testcases[id].is_sample);
  const testcaseDataIds = problems[problemId] === undefined ? [] : problems[problemId].testcaseIds.filter((id) => !testcases[id].is_sample);

  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch((browseTestcase(authToken, problemId)));
    dispatch((browseAssistingData(authToken, problemId)));
  }, [authToken, dispatch, problemId]);

  return (
    <>
      <SimpleBar title="Title">{problems[problemId] === undefined ? 'error' : problems[problemId].title}</SimpleBar>
      <SimpleBar title="Description">{problems[problemId] === undefined ? 'error' : problems[problemId].description}</SimpleBar>
      <SimpleBar title="About Input and Output">{problems[problemId] === undefined ? 'error' : problems[problemId].io_description}</SimpleBar>
      <SimpleBar title="Sample">
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'id',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
          ]}
          data={
            sampleDataIds.map((id) => ({
              id: testcases[id].id,
              time_limit: testcases[id].time_limit,
              memory_limit: testcases[id].memory_limit,
            }))
          }
        />
        <div className={classNames.sampleArea}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body2">Sample 1</Typography>
              <SampleTestArea input="286" output="1 2 0 1 0 4" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Sample 2</Typography>
              <SampleTestArea input="286" output="1 2 0 1 0 476543333345678987654567898765456789098765654567899876545456789098765434567898" />
            </Grid>
          </Grid>
        </div>
      </SimpleBar>
      <SimpleBar title="Testing Data">
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'id',
              label: 'No.',
              minWidth: 40,
              align: 'center',
              width: 50,
              type: 'string',
            },
            {
              id: 'time_limit',
              label: 'Max Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'memory_limit',
              label: 'Max Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'score',
              label: 'score',
              minWidth: 50,
              align: 'center',
              width: 100,
              type: 'string',
            },
          ]}
          data={
            testcaseDataIds.map((id) => ({
              id: testcases[id].id,
              time_limit: testcases[id].time_limit,
              memory_limit: testcases[id].memory_limit,
              score: testcases[id].score,
            }))
          }
        />
      </SimpleBar>
    </>
  );
}
