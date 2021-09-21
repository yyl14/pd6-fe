import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Snackbar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import AlignedText from '../../../ui/AlignedText';
import AutoTable from '../../../ui/AutoTable';
import SimpleBar from '../../../ui/SimpleBar';
import PageTitle from '../../../ui/PageTitle';
import { viewMySubmissionUnderProblem, readProblemInfo, readProblemScore } from '../../../../actions/myClass/problem';
import GeneralLoading from '../../../GeneralLoading';
import NoMatch from '../../../noMatch';

const TableIdent = 'My Submission Table';

/* This is a level 4 component (page component) */
export default function MySubmission() {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const accountId = useSelector((state) => state.user.id);
  const problems = useSelector((state) => state.problem);
  const challenges = useSelector((state) => state.challenges);
  const submissions = useSelector((state) => state.submissions);
  const judgments = useSelector((state) => state.judgments);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const error = useSelector((state) => state.error.myClass.problem);
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (!loading.submitCode && error.submitCode) {
      setSnackbar(true);
    } else setSnackbar(false);
  }, [error.submitCode, loading.submitCode]);

  useEffect(() => {
    dispatch(readProblemInfo(authToken, problemId));
  }, [authToken, dispatch, problemId]);

  if (challenges.byId[challengeId] === undefined || problems.byId[problemId] === undefined) {
    if (loading.viewMySubmissionUnderProblem || loading.readProblem || loading.readChallenge) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle
        text={`${challenges.byId[challengeId].title} / ${problems.byId[problemId].challenge_label} / My Submission`}
      />
      <SimpleBar title="Submission Information">
        <AlignedText
          text={`My ${challenges.byId[challengeId].selection_type[0].concat(
            challenges.byId[challengeId].selection_type.slice(1).toLowerCase(),
          )} Score`}
          childrenType="text"
        >
          <Typography variant="body1">{problems.byId[problemId].score ? problems.byId[problemId].score : 0}</Typography>
        </AlignedText>
      </SimpleBar>
      <AutoTable
        ident={TableIdent + problemId}
        hasRefreshButton
        refreshLoadings={[loading.submitCode]}
        hasFilter
        filterConfig={[
          {
            reduxStateId: 'submission_id',
            label: 'Submission ID',
            type: 'TEXT',
            operation: '=',
          },
        ]}
        defaultSort={['submit_time', 'DESC']}
        refetch={(browseParams, ident) => {
          dispatch(viewMySubmissionUnderProblem(authToken, accountId, problemId, browseParams, ident));
          dispatch(readProblemScore(authToken, problemId));
        }}
        refetchErrors={[error.viewMySubmissionUnderProblem]}
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
            colors: {
              'Waiting For Judge': 'default',
              'No Status': 'error',
              ACCEPTED: 'primary',
              'WRONG ANSWER': 'error',
              'MEMORY LIMIT EXCEED': 'error',
              'TIME LIMIT EXCEED': 'error',
              'RUNTIME ERROR': 'error',
              'COMPILE ERROR': 'error',
              'CONTACT MANAGER': 'error',
              'FORBIDDEN ACTION': 'error',
              'SYSTEM ERROR': 'error',
            },
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
            sortable: 'submit_time',
          },
        ]}
        reduxData={submissions}
        reduxDataToRows={(item) => ({
          id: item.id,
          'Submission ID': item.id,
          Status: item.verdict === null
            ? 'Waiting For Judge'
            : item.verdict
              .toLowerCase()
              .split(' ')
              .map((word) => word[0].toUpperCase() + word.substring(1))
              .join(' '),
          Score: item.latestJudgment !== null && judgments.byId[item.latestJudgment] !== undefined ? judgments.byId[item.latestJudgment].score : '-',
          'Used Time(ms)': item.latestJudgment !== null && judgments.byId[item.latestJudgment] !== undefined ? judgments.byId[item.latestJudgment].total_time : '-',
          'Used Memory(kb)': item.latestJudgment !== null && judgments.byId[item.latestJudgment] !== undefined ? judgments.byId[item.latestJudgment].max_memory : '-',
          'Submit Time': moment(item.submit_time).format('YYYY-MM-DD, HH:mm'),
          link: `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${item.id}`,
        })}
        hasLink
      />
      <Snackbar
        message="Error: code submission failed"
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      />
    </>
  );
}
