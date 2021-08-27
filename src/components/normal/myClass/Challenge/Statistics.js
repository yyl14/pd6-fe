import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Snackbar,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import {
  fetchChallenges,
  fetchChallengeSummary,
  fetchChallengeMemberSubmission,
} from '../../../../actions/myClass/challenge';
import { fetchClassMembers } from '../../../../actions/common/common';
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

const accountColumn = [{
  id: 'username',
  label: 'Username',
  minWidth: 150,
  align: 'center',
  width: 500,
  type: 'link',
  link_id: 'account_path',
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
}];

/* This is a level 4 component (page component) */
export default function Statistics() {
  const { courseId, classId, challengeId } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const members = useSelector((state) => state.classMembers.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const essays = useSelector((state) => state.essays.byId);
  const submissions = useSelector((state) => state.submissions.byId);
  const loading = useSelector((state) => state.loading.myClass.submissions);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [statisticsData, setStatisticsData] = useState([]);
  const [scoreboardTitle, setScoreboardTitle] = useState(accountColumn);
  const [scoreboardData, setScoreboardData] = useState([]);

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
    if (challenges[challengeId] !== undefined
      && challenges[challengeId].statistics !== undefined
      && !loading.fetchSubmission) {
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
        link_id: `essay-${id}-link`,
      }));
      setScoreboardTitle([].concat(accountColumn, problemList, essayList));

      // set table content
      const memberSubmissionList = challenges[challengeId].statistics.memberSubmission.map((member) => {
        const memberChallengeDetail = {
          id: member.id,
          username: members[member.id].username,
          student_id: members[member.id].student_id,
          real_name: members[member.id].real_name,
        };

        if (member.problem_scores) {
          member.problem_scores.map((judgement) => {
            const problemId = submissions[judgement.submission_id].problem_id;
            memberChallengeDetail[`problem-${problemId}`] = judgement.score;
            memberChallengeDetail[`problem-${problemId}-link`] = `/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${judgement.submission_id}`;
            return judgement;
          });
        }
        return memberChallengeDetail;
      });
      setScoreboardData(memberSubmissionList);
    } else {
      setStatisticsData([]);
    }
  }, [classId, courseId, challenges, challengeId, essays, problems, members, submissions, loading.fetchSubmission]);

  useEffect(() => {
    if (challenges[challengeId] !== undefined
      && challenges[challengeId].statistics !== undefined) {
      challenges[challengeId].statistics.memberSubmission.map(
        (member) => member.problem_scores && member.problem_scores.map(
          (judgement) => dispatch(fetchSubmission(authToken, judgement.submission_id)),
        ),
      );
    }
  }, [authToken, challengeId, dispatch, challenges]);

  return (
    <>
      <Typography variant="h3" className={classes.bottomSpace}>
        {`${(challenges[challengeId] === undefined) ? '' : challenges[challengeId].title} / Statistics`}
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
            <Button onClick={() => setShowSnackbar(true)}><Icon.Copy /></Button>
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
