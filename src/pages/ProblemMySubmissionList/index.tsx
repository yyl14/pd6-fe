import { Snackbar, Typography } from '@material-ui/core';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import moment from 'moment';
import { useState } from 'react';

import BrowsingTable from '@/components/ui/6a/BrowsingTable';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useChallenge from '@/lib/challenge/useChallenge';
import useProblem from '@/lib/problem/useProblem';
import useProblemScore from '@/lib/problem/useProblemScore';
import useViewProblemUserSubmissions, {
  MySubmissionUnderProblemSchema,
} from '@/lib/view/useViewProblemUserSubmissions';

export default function ProblemMySubmission({
  courseId,
  classId,
  challengeId,
  problemId,
  baseUrl,
  isProblemSet = false,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  problemId: string;
  baseUrl: string;
  isProblemSet?: boolean;
}) {
  const { challenge } = useChallenge(Number(challengeId));
  const { problem } = useProblem(Number(problemId));
  const { browseSubmission, isLoading, error } = useViewProblemUserSubmissions(Number(problemId));
  const { score, bestScore } = useProblemScore(Number(problemId));

  const [showSnackbar, setShowSnackbar] = useState(false);

  const submissionInfo = isProblemSet
    ? {
        label: 'My Best Score',
        displayedScore: bestScore?.score,
      }
    : {
        label: `My ${startCase(toLower(challenge?.selection_type ?? ''))} Score`,
        displayedScore: score?.score,
      };

  return (
    <>
      <PageTitle text={`${challenge?.title} / ${problem?.challenge_label} / My Submission`} />
      <SimpleBar title="Submission Information">
        <AlignedText text={submissionInfo.label} childrenType="text">
          <Typography variant="body1">{submissionInfo.displayedScore}</Typography>
        </AlignedText>
      </SimpleBar>
      <BrowsingTable<
        MySubmissionUnderProblemSchema,
        {
          id: string;
          'Submission ID': string;
          Status: string;
          Score: string;
          'Used Time (ms)': string;
          'Used Memory (kb)': string;
          'Submit Time': string;
        }
      >
        columnsConfig={[
          {
            name: 'Submission ID',
            align: 'center',
            type: 'string',
            minWidth: 150,
          },
          {
            name: 'Status',
            align: 'center',
            type: 'string',
            colors: {
              'Waiting for judge': 'default',
              'No Status': 'error',
              Accepted: 'accepted',
              'Wrong Answer': 'error',
              'Memory Limit Exceed': 'error',
              'Time Limit Exceed': 'error',
              'Runtime Error': 'error',
              'Compile Error': 'error',
              'Contact Manager': 'error',
              'Forbidden Action': 'error',
              'System Error': 'error',
            },
            minWidth: 170,
          },
          {
            name: 'Score',
            align: 'center',
            type: 'string',
            minWidth: 100,
          },
          {
            name: 'Used Time (ms)',
            align: 'center',
            type: 'string',
            minWidth: 170,
          },
          {
            name: 'Used Memory (kb)',
            align: 'center',
            type: 'string',
            minWidth: 170,
          },
          {
            name: 'Submit Time',
            align: 'center',
            type: 'string',
            sortable: true,
            dataColumn: 'submit_time',
            minWidth: 150,
          },
        ]}
        filterConfig={[
          {
            label: 'ID',
            dataColumn: 'submission_id',
            type: 'TEXT',
            operator: '=',
          },
          {
            dataColumn: 'verdict',
            label: 'Status',
            type: 'ENUM_MULTI',
            operator: 'IN',
            options: [
              { value: 'ACCEPTED', label: 'Accepted' },
              { value: 'WRONG ANSWER', label: 'Wrong Answer' },
              { value: 'MEMORY LIMIT EXCEED', label: 'Memory Limit Exceed' },
              { value: 'TIME LIMIT EXCEED', label: 'Time Limit Exceed' },
              { value: 'RUNTIME ERROR', label: 'Runtime Error' },
              { value: 'COMPILE ERROR', label: 'Compile Error' },
              { value: 'CONTACT MANAGER', label: 'Contact Manager' },
              { value: 'FORBIDDEN ACTION', label: 'Restricted Action' },
              { value: 'SYSTEM ERROR', label: 'System Error' },
            ],
          },
          {
            dataColumn: 'score',
            label: 'Score',
            type: 'TEXT',
            operator: '=',
          },
          {
            dataColumn: 'total_time',
            label: 'Used Time (ms)',
            type: 'TEXT',
            operator: '=',
          },
          {
            dataColumn: 'max_memory',
            label: 'Used Memory (kb)',
            type: 'TEXT',
            operator: '=',
          },
          {
            dataColumn: 'submit_time',
            label: 'Submit Time',
            type: 'DATE',
            operator: 'LIKE',
          },
          // TODO: Time filter
          // {
          //   dataColumn: 'submit_time',
          //   label: 'Time',
          //   type: 'DATE',
          //   operator: 'LIKE',
          // },
        ]}
        data={browseSubmission.data}
        dataToRow={({ submission_id, verdict, submit_time, score: submissionScore, total_time, max_memory }) => ({
          id: String(submission_id),
          'Submission ID': String(submission_id),
          Status: verdict ? startCase(toLower(verdict)) : 'Waiting for judge',
          Score: String(submissionScore),
          'Used Time (ms)': String(total_time),
          'Used Memory (kb)': String(max_memory),
          'Submit Time': moment(submit_time).format('YYYY-MM-DD, HH:mm:ss'),
          link: `/${baseUrl}/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission/${submission_id}`,
        })}
        isLoading={isLoading.browse}
        error={error.browse}
        pagination={browseSubmission.pagination}
        filter={browseSubmission.filter}
        sort={browseSubmission.sort}
        refresh={() => browseSubmission.refresh()}
        hasLink
      />
      <Snackbar
        message="Error: code submission failed"
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}
