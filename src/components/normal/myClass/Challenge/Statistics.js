import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Button, Snackbar, makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
  fetchChallenges,
  fetchChallengeSummary,
  fetchChallengeMemberSubmission,
} from '../../../../actions/myClass/challenge';
import { fetchDownloadFileUrl, fetchClassMembers } from '../../../../actions/common/common';
import { browseTasksUnderChallenge } from '../../../../actions/myClass/problem';
import { fetchSubmission } from '../../../../actions/myClass/submission';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import CustomTable from '../../../ui/CustomTable';
import Icon from '../../../ui/icon/index';

const useStyles = makeStyles((theme) => ({
  bottomSpace: {
    marginBottom: '50px',
  },
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
    type: 'string',
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
  const members = useSelector((state) => state.classMembers.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const essays = useSelector((state) => state.essays.byId);
  const submissions = useSelector((state) => state.submissions.byId);
  const downloadLinks = useSelector((state) => state.downloadLinks.byId);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [scoreboardTitle, setScoreboardTitle] = useState(accountColumn);
  const [scoreboardData, setScoreboardData] = useState([]);
  const [challengeTitle, setChallengeTitle] = useState('');

  useEffect(() => {
    dispatch(fetchChallenges(authToken, classId));
    dispatch(fetchClassMembers(authToken, classId));
  }, [authToken, dispatch, classId]);

  useEffect(() => {
    dispatch(browseTasksUnderChallenge(authToken, challengeId));
    dispatch(fetchChallengeSummary(authToken, challengeId));
    dispatch(fetchChallengeMemberSubmission(authToken, challengeId));
  }, [authToken, dispatch, challengeId]);

  useEffect(() => {
    if (
      challenges[challengeId]
      && challenges[challengeId].statistics
      && challenges[challengeId].statistics.summary
      && challenges[challengeId].statistics.memberSubmission
      && members
    ) {
      setStatisticsData(challenges[challengeId].statistics.summary);

      const problemList = challenges[challengeId].problemIds.map((id) => ({
        id: `problem-${id}`,
        label: problems[id].challenge_label,
        minWidth: 150,
        align: 'center',
        width: 500,
        type: 'link',
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

        if (members[member.id]) {
          memberChallengeDetail.username = members[member.id].username;
          memberChallengeDetail.student_id = members[member.id].student_id;
          memberChallengeDetail.real_name = members[member.id].real_name;
        }

        if (member.problem_scores) {
          member.problem_scores.map((judgement) => {
            if (submissions[judgement.submission_id]) {
              const problemId = submissions[judgement.submission_id].problem_id;
              memberChallengeDetail[`problem-${problemId}`] = judgement.score;
              memberChallengeDetail[
                `problem-${problemId}-link`
              ] = `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${judgement.submission_id}`;
            }
            return judgement;
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
  }, [classId, courseId, challenges, challengeId, essays, problems, members, submissions, downloadLinks]);

  useEffect(() => {
    if (
      challenges[challengeId]
      && challenges[challengeId].statistics
      && challenges[challengeId].statistics.memberSubmission
    ) {
      setChallengeTitle(challenges[challengeId].title);
      challenges[challengeId].statistics.memberSubmission.map((member) => {
        if (member.problem_scores) {
          member.problem_scores.map((judgement) => dispatch(fetchSubmission(authToken, judgement.submission_id)));
        }
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
  }, [authToken, challengeId, dispatch, challenges]);

  return (
    <>
      <Typography variant="h3" className={classes.bottomSpace}>
        {`${challengeTitle} / Statistics`}
      </Typography>
      <SimpleBar title="Statistics" />
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
      <SimpleBar title="Scoreboard" />
      <CustomTable
        buttons={(
          <>
            <Button onClick={() => setShowSnackbar(true)}>
              <Icon.Copy />
            </Button>
          </>
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
