import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Snackbar, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchChallengeSummary, fetchChallengeMemberSubmission } from '../../../../actions/myClass/challenge';
import { fetchDownloadFileUrl } from '../../../../actions/common/common';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import CustomTable from '../../../ui/CustomTable';
import PageTitle from '../../../ui/PageTitle';
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles(() => ({
  placeholder: {
    height: '50px',
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

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [scoreboardTitle, setScoreboardTitle] = useState(accountColumn);
  const [scoreboardData, setScoreboardData] = useState([]);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [scoreboardHTML, setScoreboardHTML] = useState('');

  useEffect(() => {
    dispatch(fetchChallengeSummary(authToken, challengeId));
    dispatch(fetchChallengeMemberSubmission(authToken, challengeId));
  }, [authToken, dispatch, challengeId]);

  useEffect(() => {
    if (
      challenges[challengeId]
      && challenges[challengeId].statistics
      && challenges[challengeId].statistics.summary
      && challenges[challengeId].statistics.memberSubmission
    ) {
      setStatisticsData(challenges[challengeId].statistics.summary);

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
          memberChallengeDetail.path = `/user-profile/${classMember.id}`;
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
      challenges[challengeId]
      && challenges[challengeId].statistics
      && challenges[challengeId].statistics.memberSubmission
    ) {
      setChallengeTitle(challenges[challengeId].title);
      challenges[challengeId].statistics.memberSubmission.map((member) => {
        if (member.essay_submissions) {
          member.essay_submissions.map((record) => dispatch(
            fetchDownloadFileUrl(authToken, {
              filename: record.filename,
              uuid: record.content_file_uuid,
              as_attachment: false,
            }),
          ));
        }
        return member;
      });
    }
  }, [authToken, challengeId, challenges, dispatch]);

  useEffect(() => {
    // assemble html data to copy
    let tableHTML = '<table>';
    tableHTML += '<tr>';
    scoreboardTitle.map((title) => {
      tableHTML += `<td><b>${title.label}</b></td>`;
      return title;
    });
    tableHTML += '</tr>';

    scoreboardData.map((row) => {
      tableHTML += '<tr>';
      scoreboardTitle.map((column) => {
        const value = row[column.id] !== undefined ? row[column.id] : '';
        if (column.type === 'link') {
          const link = row[column.link_id] ? row[column.link_id] : '';
          tableHTML += `<td><a href='${link}'>${value}</a></td>`;
        } else {
          tableHTML += `<td>${value}</td>`;
        }
        return column;
      });
      tableHTML += '</tr>';
      return row;
    });

    tableHTML += '</table>';
    setScoreboardHTML(tableHTML);
  }, [scoreboardData, scoreboardTitle]);

  return (
    <>
      <PageTitle text={`${challengeTitle} / Statistics`} />
      <SimpleBar title="Global Statistics" />
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
      <div className={classes.placeholder} />
      <SimpleBar title="Class Scoreboard" />
      <CustomTable
        buttons={(
          <CopyToClipboard options={{ format: 'text/html' }} text={scoreboardHTML} onCopy={() => setShowSnackbar(true)}>
            <Button>
              <Icon.Copy />
            </Button>
          </CopyToClipboard>
        )}
        data={scoreboardData}
        columns={scoreboardTitle}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        message="Entire table is copied to clipboard."
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
}
