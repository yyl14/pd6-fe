import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import CustomTable from '../../../ui/CustomTable';
import NoMatch from '../../../noMatch';
import SimpleBar from '../../../ui/SimpleBar';
import {
  readSubmission,
  readSubmissionDetail,
  readProblemScore,
  browseTasksUnderChallenge,
} from '../../../../actions/myClass/problem';
import GeneralLoading from '../../../GeneralLoading';

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
  }, [accountId, authToken, dispatch, problemId]);

  useEffect(() => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  useEffect(() => {
    if (!loading.browseTasksUnderChallenge) {
      dispatch(readProblemScore(authToken, problemId));
    }
  }, [authToken, dispatch, loading.browseTasksUnderChallenge, problemId]);

  useEffect(() => {
    if (submissionIds !== []) {
      submissionIds.map((id) => dispatch(readSubmissionDetail(authToken, id)));
    }
  }, [authToken, challengeId, dispatch, problemId, submissionIds]);

  useEffect(() => {
    if (judgmentIds !== []) {
      setTableData(
        submissionIds
          .filter(
            (id) => submissions[id].account_id === accountId && submissions[id].problem_id === parseInt(problemId, 10),
          )
          .map((id) => {
            if (judgmentIds.filter((key) => judgments[key].submission_id === id)[0]) {
              return {
                key: id,
                id,
                submit_time: moment(submissions[id].submit_time).format('YYYY-MM-DD, HH:mm'),
                status: judgments[judgmentIds.filter((key) => judgments[key].submission_id === id)[0]].status
                  .toLowerCase()
                  .split(' ')
                  .map((word) => word[0].toUpperCase() + word.substring(1))
                  .join(' '),
                score: judgments[judgmentIds.filter((key) => judgments[key].submission_id === id)[0]].score,
                used_time: judgments[judgmentIds.filter((key) => judgments[key].submission_id === id)[0]].total_time,
                used_memory: judgments[judgmentIds.filter((key) => judgments[key].submission_id === id)[0]].max_memory,
                path: `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${id}`,
              };
            }
            return '';
          }),
      );
    }
  }, [accountId, challengeId, classId, courseId, judgmentIds, judgments, problemId, submissionIds, submissions]);
  if (
    challenges[challengeId] === undefined
    || problems[problemId] === undefined
    || submissions === undefined
    || judgments === undefined
    || problems[problemId].score === undefined
  ) {
    // if (
    //   !loading.readProblem
    //   && !loading.readSubmission
    //   && !loading.readChallenge
    //   && !loading.readJudgment
    //   && !loading.readProblemScore
    // ) {
    //   return <NoMatch />;
    // }
    return <GeneralLoading />;
  }

  const handleRefresh = () => {
    dispatch(readSubmission(authToken, accountId, problemId));
    dispatch(readProblemScore(authToken, problemId));
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' / '}
        {problems[problemId].challenge_label}
        {' '}
        / My Submission
      </Typography>
      <SimpleBar title="Submission Information">
        <AlignedText text="My Last Score" childrenType="text">
          <Typography variant="body1">{problems[problemId].score}</Typography>
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
