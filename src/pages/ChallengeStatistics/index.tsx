import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';

import CopyToClipboardButton from '@/components/ui/CopyToClipboardButton';
import CustomTable from '@/components/ui/CustomTable';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import SimpleTable from '@/components/ui/SimpleTable';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useChallenge from '@/lib/challenge/useChallenge';
import useChallengeStatistics from '@/lib/challenge/useChallengeStatistics';
import useMemberSubmissionStatistics from '@/lib/challenge/useMemberSubmissionStatistics';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import useUserClasses from '@/lib/user/useUserClasses';
import useAccountSummaries from '@/lib/accountSummary/useAccountSummaries';

/* eslint indent: 0 */

const useStyles = makeStyles(() => ({
  managerButtons: {
    display: 'flex',
    justifyContent: 'end',
  },
  copyButton: {
    marginRight: '10px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

const accountColumn = [
  {
    id: 'username',
    label: 'Username',
    minWidth: 150,
    align: 'center',
    width: 500,
    type: 'link',
    isExternal: true,
    link_id: 'path',
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
];

interface MemberChallengeDetailProp {
  [index: string]: number | string;
  id: number;
  username: string;
  nickname: string;
  role: string;
  real_name: string;
  alternative_email: string;
  student_id: string;
  path: string;
}

interface StatisticsProp {
  task_label: string;
  solved_member_count: number;
  submission_count: number;
  member_count: number;
}

/* This is a level 4 component (page component) */
export default function ChallengeStatistics({
  courseId,
  classId,
  challengeId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
}) {
  const className = useStyles();

  const { challenge } = useChallenge(Number(challengeId));
  const { memberSubmissionStatistics } = useMemberSubmissionStatistics(Number(challengeId));
  const { challengeStatistics, downloadAllSubmissions, downloadAllPlagiarismReports } = useChallengeStatistics(Number(challengeId));
  const { tasks } = useChallengeTasks(Number(challengeId));
  const { accountClasses } = useUserClasses();
  

  const [statisticsData, setStatisticsData] = useState<StatisticsProp[]>([]);
  const [scoreboardTitle, setScoreboardTitle] = useState(accountColumn);
  const [scoreboardData, setScoreboardData] = useState<MemberChallengeDetailProp[]>([]);
  const [challengeTitle, setChallengeTitle] = useState('');

  const [showEmailSentPopup, setShowEmailSentPopup] = useState(false);
  const [emailSentPopupMessage, setEmailSentPopupMessage] = useState(
    'All submissions for the challenge will be sent to your email. Please check your mailbox for the file(s).',
  );
  const [problemsById, problemIds] = useReduxStateShape(tasks?.problem);
  const [essaysById, essayIds] = useReduxStateShape(tasks?.essay);
  const [memberSubmissionStatisticsById, memberSubmissionStatisticIds] = useReduxStateShape(
    memberSubmissionStatistics?.data?.member
  );
  const accountIds = memberSubmissionStatisticIds.map((item) => String(item));
  const { accountSummaries } = useAccountSummaries(accountIds);
  const [accountSummariesById, accountSummaryIds] = useReduxStateShape(accountSummaries);

  const role = useMemo(
    () => accountClasses?.filter((item) => item.class_id === Number(classId))[0].role,
    [classId, accountClasses],
  );

  useEffect(() => {
    if (challenge && challengeStatistics && memberSubmissionStatistics) {
      setStatisticsData(
        [...challengeStatistics?.tasks].sort((a, b) => a.task_label.localeCompare(b.task_label))
          .map((item) => ({ ...item, id: item.task_label })),
      );

      const problemList = problemIds?.map((id) => ({
        id: `problem-${id}`,
        label: problemsById[id]?.challenge_label,
        minWidth: 150,
        align: 'center',
        width: 500,
        type: 'link',
        isExternal: true,
        link_id: `problem-${id}-link`,
      }));
      const essayList = essayIds?.map((id) => ({
        id: `essay-${id}`,
        label: essaysById[id]?.challenge_label,
        minWidth: 150,
        align: 'center',
        width: 500,
        type: 'link',
        isExternal: true,
        link_id: `essay-${id}-link`,
      }));
      setScoreboardTitle(accountColumn.concat(problemList, essayList));

      // set table content
      const memberSubmissionList = accountSummaryIds?.map((member) => {

        const memberChallengeDetail = {} as MemberChallengeDetailProp;
        memberChallengeDetail.id = memberSubmissionStatisticsById[member].id;
        const classMember = accountSummariesById[member];
        if (classMember) {
          memberChallengeDetail.username = classMember.username;
          memberChallengeDetail.student_id = classMember.student_id;
          memberChallengeDetail.real_name = classMember.real_name;
          memberChallengeDetail.path = `${window.location.origin}/user-profile/${classMember.id}`;
        }
        const problemScores = memberSubmissionStatisticsById[member].problem_scores;       
        if (problemScores) {
          problemScores?.map((p) => {
            memberChallengeDetail[`problem-${p.problem_id}`] = p.judgment.score;
            memberChallengeDetail[
              `problem-${p.problem_id}-link`
            ] = `${window.location.origin}/my-class/${courseId}/${classId}/submission/${p.judgment.submission_id}`;
            return p;
          });
        }
        const essaySubmissions = memberSubmissionStatisticsById[member].essay_submissions;
        if (essaySubmissions) {
          essaySubmissions?.map((record) => {
            memberChallengeDetail[`essay-${record.essay_id}`] = 'pdf';
            const downloadLink = `${window.location.origin}/file?uuid=${record.content_file_uuid}&filename=${record.filename}`;
            memberChallengeDetail[`essay-${record.essay_id}-link`] = downloadLink;
            return record;
          });
        }
        return memberChallengeDetail;
      });
      setScoreboardData(memberSubmissionList);
    }
  }, [
    courseId,
    classId,
    accountSummariesById,
    accountSummaryIds,
    challenge,
    challengeStatistics,
    memberSubmissionStatistics,
    memberSubmissionStatisticsById,
    memberSubmissionStatisticIds,
    problemsById,
    problemIds,
    essaysById,
    essayIds
  ]);

  useEffect(() => {
    if (challenge && challengeStatistics && memberSubmissionStatistics) {
      setChallengeTitle(challenge.title);
    }
  }, [challenge, challengeStatistics, memberSubmissionStatistics]);

  // assemble html data to copy
  const scoreboardHTML = useMemo(
    () => `
    <table>
      <tr>
      ${scoreboardTitle
        .map(
          (title) => `
          <td>
            <b>${title.label}</b>
          </td>`,
        )
        .join('')}
      </tr>
    ${scoreboardData
      .map(
        (row) => `
        <tr>
          ${scoreboardTitle
            .map((column) =>
              (column.type === 'link' && column.link_id)
                ? `<td><a href='${row[column.link_id] ?? ''}'>${row[column.id] ?? ''}</a></td>`
                : `<td>${row[column.id] ?? ''}</td>`,
            )
            .join('')}
        </tr>`,
      )
      .join('')}
    </table>
    `,

    [scoreboardData, scoreboardTitle],
  );

  const handleClickDownloadAllSubmission = async () => {
    const res = downloadAllSubmissions({challenge_id: Number(challengeId), as_attachment: true});
    if((await res).ok){
      setEmailSentPopupMessage(
        'All submissions for the challenge will be sent to your email. Please check your mailbox for the file(s).',
      );
      setShowEmailSentPopup(true);
    }
  };

  const handleClickDownloadAllPlagiarismReport = async () => {
    const res = downloadAllPlagiarismReports({challenge_id: Number(challengeId), as_attachment: true});
    if((await res).ok){
      setEmailSentPopupMessage(
        'All plagiarism reports for the challenge will be sent to your email. Please check your mailbox for the report(s). Due to system limitation, this might sometimes fail; please retry if you did not get (all) the files within 10 minutes.',
      );
      setShowEmailSentPopup(true);
    }
  };

  return (
    <>
      <PageTitle text={`${challengeTitle} / Statistics`} />
      {role === 'MANAGER' && (
        <div className={className.managerButtons}>
          <Button onClick={handleClickDownloadAllSubmission}>Download All Submissions</Button>
          <Button onClick={handleClickDownloadAllPlagiarismReport}>Get All Plagiarism Reports</Button>
        </div>
      )}

      <SimpleBar title="Global Statistics" noIndent>
        <SimpleTable
          data={statisticsData}
          isEdit={false}
          hasDelete={false}
          buttons={false}
          setData={false}
          columns={[
            {
              id: 'task_label',
              label: 'Task',
              minWidth: 50,
              align: 'center',
              width: 120,
              type: 'string',
            },
            {
              id: 'solved_member_count',
              label: 'Solved Member',
              minWidth: 50,
              align: 'center',
              width: 200,
              type: 'string',
            },
            {
              id: 'submission_count',
              label: 'Submission',
              minWidth: 50,
              align: 'center',
              width: 120,
              type: 'string',
            },
            {
              id: 'member_count',
              label: 'User Tried',
              minWidth: 50,
              align: 'center',
              width: 120,
              type: 'string',
            },
          ]}
        />
      </SimpleBar>
      <SimpleBar title="Class Scoreboard" noIndent>
        <CustomTable
          buttons={
            <div className={className.copyButton}>
              <CopyToClipboardButton text={scoreboardHTML} format="text/html" className={false} />
            </div>
          }
          data={scoreboardData}
          columns={scoreboardTitle}
          hasSearch={false}
          hasLink={false}
          linkName={false}
          >
            <></>
          </CustomTable>
      </SimpleBar>
      <Dialog open={showEmailSentPopup} keepMounted onClose={() => setShowEmailSentPopup(false)}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Preparing Data</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{emailSentPopupMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEmailSentPopup(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
