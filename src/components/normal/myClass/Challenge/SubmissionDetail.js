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
import { useHistory, useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { format } from 'date-fns';
import Icon from '../../../ui/icon/index';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import NoMatch from '../../../noMatch';
import { readSubmissionDetail, readSubmission, readProblemInfo } from '../../../../actions/myClass/problem';
// import { browseSubmitLang } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.hover,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionDetail() {
  const {
    courseId, classId, challengeId, problemId, submissionId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();
  const [color, setColor] = useState('blue');
  const dispatch = useDispatch();

  const submissions = useSelector((state) => state.submissions.byId);
  const judgments = useSelector((state) => state.judgments.byId);
  const judgmentIds = useSelector((state) => state.judgments.allIds);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);
  const account = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readProblemInfo(authToken, problemId, challengeId));
  }, [authToken, challengeId, dispatch, problemId]);

  useEffect(() => {
    dispatch(readSubmissionDetail(authToken, submissionId));
  }, [authToken, challengeId, dispatch, problemId, submissionId]);

  useEffect(() => {
    dispatch(readSubmission(authToken, account.id, problemId));
  }, [account.id, authToken, dispatch, problemId]);

  if (problems.byId[problemId] === undefined || challenges.byId[challengeId] === undefined || submissions[submissionId] === undefined || judgmentIds === undefined) {
    if (!loading.readProblem && !loading.readSubmission && !loading.readChallenge && !loading.readJudgment) {
      return <NoMatch />;
    }
    return <div>loading...</div>;
  }
  // if (error.readSubmission) {
  //   console.log(error.readSubmission);
  //   return (<div>{error.readSubmission}</div>);
  // }

  const handleRefresh = () => {
    dispatch(readSubmissionDetail(authToken, submissionId));
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {submissionId}
        {' '}
        / Submission Detail
      </Typography>
      <div className={classNames.generalButtons}>
        <Button>Rejudge</Button>
        <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>Refresh</Button>
      </div>
      <SimpleBar title="Submission Information">
        <AlignedText text="Submission ID" childrenType="text">
          <Typography variant="body1">{submissionId}</Typography>
        </AlignedText>
        <AlignedText text="Username" childrenType="text">
          <Link to="/my-profile" className={classNames.textLink}>
            <Typography variant="body1">{account.username}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">...</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{account.real_name}</Typography>
        </AlignedText>
        <AlignedText text="Challenge" childrenType="text">
          <Link to={`/my-class/${courseId}/${classId}/challenge/${challengeId}`} className={classNames.textLink}>
            <Typography variant="body1">{challenges.byId[challengeId].title}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Label" childrenType="text">
          <Link to={`/my-class/${courseId}/${classId}/challenge/${challengeId}/${problemId}`} className={classNames.textLink}>
            <Typography variant="body1">{problems.byId[problemId].challenge_label}</Typography>
          </Link>
        </AlignedText>
        <AlignedText text="Task Title" childrenType="text">
          <Typography variant="body1">{problems.byId[problemId].title}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          {judgmentIds.map((key) => {
            if (judgments[key].submission_id === parseInt(submissionId, 10)) {
              if (judgments[key].status === 'ACCEPTED') {
                return <Typography variant="body1" key={key}>{judgments[key].status.charAt(0).concat(judgments[key].status.slice(1).toLowerCase())}</Typography>;
              }
              return <Typography variant="body1" color="secondary" key={key}>{judgments[key].status.toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substring(1)).join(' ')}</Typography>;
            }
            return '';
          })}
        </AlignedText>
        <AlignedText text="Score" childrenType="text">
          <Typography variant="body1">
            {judgmentIds.map((key) => (judgments[key].submission_id === parseInt(submissionId, 10) ? judgments[key].score : ''))}
          </Typography>
        </AlignedText>
        <AlignedText text="Submit Time" childrenType="text">
          <Typography variant="body1">{moment(submissions[submissionId].submit_time).format('YYYY-MM-DD, HH:mm')}</Typography>
        </AlignedText>
        {/* <AlignedText text="Language" childrenType="text">
          {submitLangs[submissions[submissionId].language_id]
            && <Typography variant="body1">{submitLangs[submissions[submissionId].language_id].name}</Typography>}
        </AlignedText> */}
      </SimpleBar>
      <SimpleBar title="Submission Result" />
      <SimpleBar title="Code" />
    </>
  );
}
