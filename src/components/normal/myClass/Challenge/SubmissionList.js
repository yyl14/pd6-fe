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
import moment from 'moment';
import { format } from 'date-fns';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import NoMatch from '../../../noMatch';
import SimpleBar from '../../../ui/SimpleBar';
import { readProblemInfo, readSubmission, readSubmissionDetail } from '../../../../actions/myClass/problem';

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
  const [tableData, setTableData] = useState([]);

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const submissions = useSelector((state) => state.submissions.byId);
  const submissionIds = useSelector((state) => state.submissions.allIds);
  const judgments = useSelector((state) => state.judgments.byId);
  const judgmentIds = useSelector((state) => state.judgments.allIds);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readSubmission(authToken, accountId, problemId));
  }, [accountId, authToken, challengeId, dispatch, problemId]);

  useEffect(() => {
    if (submissionIds !== []) {
      submissionIds.map((id) => dispatch(readSubmissionDetail(authToken, id, problemId, challengeId)));
    }
  }, [authToken, challengeId, dispatch, problemId, submissionIds]);

  useEffect(() => {
    if (judgmentIds !== []) {
      setTableData(
        judgmentIds.map((id) => ({
          id: judgments[id].submission_id,
          status: judgments[id].status,
          score: judgments[id].score,
          used_time: judgments[id].total_time,
          used_memory: judgments[id].max_memory,
          submit_time: moment(submissions[judgments[id].submission_id].submit_time).format('YYYY-MM-DD, HH:mm'),
          path: `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${judgments[id].submission_id}`,
        })),
        // submissionIds.map((id) => ({
        //   id,
        //   submit_time: moment(submissions[id].submit_time).format('YYYY-MM-DD, HH:mm'),
        //   status: judgmentIds.map((key) => (judgments[key].submission_id === id ? judgments[key].status : '')),
        //   score: judgmentIds.map((key) => (judgments[key].submission_id === id ? judgments[key].score : '')),
        //   used_time: judgmentIds.map((key) => (judgments[key].submission_id === id ? judgments[key].total_time : '')),
        //   used_memory: judgmentIds.map((key) => (judgments[key].submission_id === id ? judgments[key].max_memory : '')),
        //   path: `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${id}`,
        // })),
      );
    }
  }, [challengeId, classId, courseId, judgmentIds, judgments, problemId, submissions]);

  if (challenges[challengeId] === undefined || problems[problemId] === undefined || submissions === undefined || judgments === undefined) {
    if (!loading.readProblem && !loading.readSubmission && !loading.readChallenge && !loading.readJudgment) {
      return <NoMatch />;
    }
    return <div>loading...</div>;
  }

  const handleRefresh = () => {
    dispatch(readSubmission(authToken, accountId, problemId));
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        /
        {' '}
        {problems[problemId].challenge_label}
        {' '}
        / My Submission
      </Typography>
      <SimpleBar title="Submission Information">
        <AlignedText text="Your Latest Score" childrenType="text">
          <Typography variant="body1">N/A</Typography>
        </AlignedText>
      </SimpleBar>
      <CustomTable
        hasSearch={false}
        buttons={(
          <>
            <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>
              Refresh
            </Button>
          </>
        )}
        data={tableData}
        columns={[
          {
            id: 'id',
            label: 'Submission ID',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'status',
            label: 'Status',
            minWidth: 50,
            align: 'center',
            width: 170,
            type: 'string',
          },
          {
            id: 'score',
            label: 'Score',
            minWidth: 50,
            align: 'center',
            width: 120,
            type: 'string',
          },
          {
            id: 'used_time',
            label: 'Used Time(ms)',
            minWidth: 50,
            align: 'center',
            width: 150,
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
            width: 200,
            type: 'string',
          },
        ]}
        hasLink
        linkName="path"
      />
    </>

  );
}
