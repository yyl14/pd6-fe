import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import AutoTable from '../../../ui/AutoTable';
import NoMatch from '../../../noMatch';
import SimpleBar from '../../../ui/SimpleBar';
import {
  readSubmission,
  readSubmissionDetail,
  readProblemScore,
} from '../../../../actions/myClass/problem';
import GeneralLoading from '../../../GeneralLoading';

const useStyles = makeStyles(() => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

const TableIdent = 'My Submission Table';

/* This is a level 4 component (page component) */
export default function SubmissionList() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const classNames = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const problems = useSelector((state) => state.problem);
  const challenges = useSelector((state) => state.challenges);
  const submissions = useSelector((state) => state.submissions);
  const judgments = useSelector((state) => state.judgments);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    if (!loading.browseTasksUnderChallenge) {
      dispatch(readProblemScore(authToken, problemId));
    }
  }, [authToken, dispatch, loading.browseTasksUnderChallenge, problemId]);

  useEffect(() => {
    if (submissions.allIds !== []) {
      submissions.allIds.map((id) => dispatch(readSubmissionDetail(authToken, id)));
    }
  }, [authToken, challengeId, dispatch, problemId, submissions]);

  if (
    challenges.byId[challengeId] === undefined
    || problems.byId[problemId] === undefined
    || submissions.byId === undefined
    || judgments.byId === undefined
    || problems.byId[problemId].score === undefined
  ) {
    if (
      loading.readSubmission
      || loading.readSubmissionDetail
      || loading.readProblemScore
      || loading.browseTasksUnderChallenge
      || loading.readProblemScore
    ) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleRefresh = () => {
    const browseParams = {
      limit: 5,
      offset: 0 * 5,
      filter: [],
      sort: [],
    };
    dispatch(readSubmission(authToken, accountId, problemId, browseParams, TableIdent));
    dispatch(readProblemScore(authToken, problemId));
    if (submissions.allIds !== []) {
      submissions.allIds.map((id) => dispatch(readSubmissionDetail(authToken, id)));
    }
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges.byId[challengeId].title}
        {' / '}
        {problems.byId[problemId].challenge_label}
        {' '}
        / My Submission
      </Typography>
      <SimpleBar title="Submission Information">
        <AlignedText text="My Last Score" childrenType="text">
          <Typography variant="body1">{problems.byId[problemId].score}</Typography>
        </AlignedText>
      </SimpleBar>
      <AutoTable
        ident={TableIdent}
        buttons={(
          <>
            <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>
              Refresh
            </Button>
          </>
        )}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'submit_time',
            label: 'Submit Time',
            type: 'DATE',
            operation: 'LIKE',
          },
        ]}
        refetch={(browseParams, ident) => {
          dispatch(readSubmission(authToken, accountId, problemId, browseParams, ident));
        }}
        refetchErrors={[]}
        columns={[
          {
            name: 'Submission ID',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Score',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Used Time(ms)',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Used Memory(kb)',
            align: 'center',
            type: 'string',
          },
          {
            name: 'Submit Time',
            align: 'center',
            type: 'string',
          },
        ]}
        reduxData={submissions}
        reduxDataToRows={(item) => {
          const lastJudgmentId = judgments.allIds.filter((key) => judgments.byId[key].submission_id === item.id)[0];
          return {
            'Submission ID': item.id,
            Status: lastJudgmentId ? judgments.byId[lastJudgmentId].status
              .toLowerCase()
              .split(' ')
              .map((word) => word[0].toUpperCase() + word.substring(1))
              .join(' ')
              : 'Waiting For Judge',
            Score: lastJudgmentId ? judgments.byId[lastJudgmentId].score : '-',
            'Used Time(ms)': lastJudgmentId ? judgments.byId[lastJudgmentId].total_time : '-',
            'Used Memory(kb)': lastJudgmentId ? judgments.byId[lastJudgmentId].max_memory : '-',
            'Submit Time': moment(item.submit_time).format('YYYY-MM-DD, HH:mm'),
            link: `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${item.id}`,
          };
        }}
        hasLink
      />
    </>
  );
}
