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
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDownloadFileUrl } from '../../../../actions/common/common';
import {
  downloadAllPlagiarismReports,
  downloadAllSubmissions,
  fetchChallengeMemberSubmission,
  fetchChallengeSummary,
} from '../../../../actions/myClass/challenge';
import CopyToClipboardButton from '../../../ui/CopyToClipboardButton';
import CustomTable from '../../../ui/CustomTable';
import PageTitle from '../../../ui/PageTitle';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';

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

/* This is a level 4 component (page component) */
export default function Statistics() {
  const { courseId, classId, challengeId } = useParams();
  const classes = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const essays = useSelector((state) => state.essays.byId);
  const downloadLinks = useSelector((state) => state.downloadLinks.byId);
  const accounts = useSelector((state) => state.accounts);
  const userClasses = useSelector((state) => state.user.classes);

  const [statisticsData, setStatisticsData] = useState([]);
  const [scoreboardTitle, setScoreboardTitle] = useState(accountColumn);
  const [scoreboardData, setScoreboardData] = useState([]);
  const [challengeTitle, setChallengeTitle] = useState('');

  const [showEmailSentPopup, setShowEmailSentPopup] = useState(false);
  const [emailSentPopupMessage, setEmailSentPopupMessage] = useState(
    'All submissions for the challenge will be sent to your email. Please check your mailbox for the file(s).',
  );

  const role = useMemo(
    () => userClasses.filter((item) => item.class_id === Number(classId))[0].role,
    [classId, userClasses],
  );

  useEffect(() => {
    dispatch(fetchChallengeSummary(authToken, challengeId));
    dispatch(fetchChallengeMemberSubmission(authToken, challengeId));
  }, [authToken, dispatch, challengeId]);

  useEffect(() => {
    if (
      challenges[challengeId] &&
      challenges[challengeId].statistics &&
      challenges[challengeId].statistics.summary &&
      challenges[challengeId].statistics.memberSubmission
    ) {
      setStatisticsData(
        [...challenges[challengeId].statistics.summary]
          .sort((a, b) => a.task_label.localeCompare(b.task_label))
          .map((item) => ({ ...item, id: item.task_label })),
      );

      const problemList = challenges[challengeId].problemIds.map((id) => ({
        id: `problem-${id}`,
        label: problems[id].challenge_label,
        minWidth: 150,
        align: 'center',
        width: 500,
        type: 'link',
        isExternal: true,
        link_id: `problem-${id}-link`,
      }));
      const essayList = challenges[challengeId].essayIds.map((id) => ({
        id: `essay-${id}`,
        label: essays[id].challenge_label,
        minWidth: 150,
        align: 'center',
        width: 500,
        type: 'link',
        isExternal: true,
        link_id: `essay-${id}-link`,
      }));
      setScoreboardTitle([].concat(accountColumn, problemList, essayList));

      // set table content
      const memberSubmissionList = challenges[challengeId].statistics.memberSubmission.map((member) => {
        const memberChallengeDetail = {
          id: member.id,
        };
        const classMember = accounts.byId[member.id];
        if (classMember) {
          memberChallengeDetail.username = classMember.username;
          memberChallengeDetail.student_id = classMember.student_id;
          memberChallengeDetail.real_name = classMember.real_name;
          memberChallengeDetail.path = `${window.location.origin}/user-profile/${classMember.id}`;
        }

        if (member.problem_scores) {
          member.problem_scores.map((p) => {
            memberChallengeDetail[`problem-${p.problem_id}`] = p.judgment.score;
            memberChallengeDetail[
              `problem-${p.problem_id}-link`
            ] = `${window.location.origin}/my-class/${courseId}/${classId}/submission/${p.judgment.submission_id}`;
            return p;
          });
        }

        if (member.essay_submissions) {
          member.essay_submissions.map((record) => {
            memberChallengeDetail[`essay-${record.essay_id}`] = 'pdf';
            if (downloadLinks[record.content_file_uuid]) {
              memberChallengeDetail[`essay-${record.essay_id}-link`] = downloadLinks[record.content_file_uuid].url;
            }
            return record;
          });
        }
        return memberChallengeDetail;
      });
      setScoreboardData(memberSubmissionList);
    }
  }, [accounts.byId, challengeId, challenges, classId, courseId, downloadLinks, essays, problems]);

  useEffect(() => {
    if (
      challenges[challengeId] &&
      challenges[challengeId].statistics &&
      challenges[challengeId].statistics.memberSubmission
    ) {
      setChallengeTitle(challenges[challengeId].title);
      challenges[challengeId].statistics.memberSubmission.map((member) => {
        if (member.essay_submissions) {
          member.essay_submissions.map((record) =>
            dispatch(
              fetchDownloadFileUrl(authToken, {
                filename: record.filename,
                uuid: record.content_file_uuid,
                as_attachment: false,
              }),
            ),
          );
        }
        return member;
      });
    }
  }, [authToken, challengeId, challenges, dispatch]);

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
              column.type === 'link'
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

  const handleClickDownloadAllSubmission = () => {
    dispatch(downloadAllSubmissions(authToken, challengeId, true));
    setEmailSentPopupMessage(
      'All submissions for the challenge will be sent to your email. Please check your mailbox for the file(s).',
    );
    setShowEmailSentPopup(true);
  };

  const handleClickDownloadAllPlagiarismReport = () => {
    dispatch(downloadAllPlagiarismReports(authToken, challengeId, true));
    setEmailSentPopupMessage(
      'All plagiarism reports for the challenge will be sent to your email. Please check your mailbox for the report(s). Due to system limitation, this might sometimes fail; please retry if you did not get (all) the files within 10 minutes.',
    );
    setShowEmailSentPopup(true);
  };

  return (
    <>
      <PageTitle text={`${challengeTitle} / Statistics`} />
      {role === 'MANAGER' && (
        <div className={classes.managerButtons}>
          <Button onClick={handleClickDownloadAllSubmission}>Download All Submissions</Button>
          <Button onClick={handleClickDownloadAllPlagiarismReport}>Get All Plagiarism Reports</Button>
        </div>
      )}

      <SimpleBar title="Global Statistics" noIndent>
        <SimpleTable
          data={statisticsData}
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
            <div className={classes.copyButton}>
              <CopyToClipboardButton text={scoreboardHTML} format="text/html" />
            </div>
          }
          data={scoreboardData}
          columns={scoreboardTitle}
        />
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
