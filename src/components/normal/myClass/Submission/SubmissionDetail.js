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
import SimpleTable from '../../../ui/SimpleTable';
import CopyToClipboardButton from '../../../ui/CopyToClipboardButton';
import NoMatch from '../../../noMatch';
import {
  readSubmissionDetail, readProblem, browseChallengeOverview, browseJudgeCases, readTestcase,
  fetchSubmission, getAccountBatch,
} from '../../../../actions/myClass/submission';

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
  codeField: {
    width: '50vw',
  },
}));

/* This is a level 4 component (page component) */
export default function SubmissionDetail(props) {
  const {
    courseId, classId, submissionId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();
  const [color, setColor] = useState('blue');
  const [popUp, setPopUp] = useState(false);
  const [role, setRole] = useState('NORMAL');
  const [tableData, setTableData] = useState([]);
  const [challengeId, setChallengeId] = useState('');
  const [problemId, setProblemId] = useState('');
  const [judgmentId, setJudgmentId] = useState('');
  const [accountId, setAccountId] = useState('');
  const dispatch = useDispatch();

  const submissions = useSelector((state) => state.submissions.byId);
  const judgments = useSelector((state) => state.judgments.byId);
  const judgmentIds = useSelector((state) => state.judgments.allIds);
  const challenges = useSelector((state) => state.challenges);
  const problems = useSelector((state) => state.problem);
  const user = useSelector((state) => state.user);
  const accounts = useSelector((state) => state.accounts);
  const judgeCases = useSelector((state) => state.judgeCases);
  const testcases = useSelector((state) => state.testcases.byId);
  const testcaseIds = useSelector((state) => state.testcases.allIds);
  const authToken = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.myClass.problem);
  const loading = useSelector((state) => state.loading.myClass.problem);

  useEffect(() => {
    dispatch(readSubmissionDetail(authToken, submissionId));
    dispatch(fetchSubmission(authToken, submissionId));
  }, [authToken, dispatch, submissionId]);

  useEffect(() => {
    if (submissions[submissionId] !== undefined) {
      dispatch(getAccountBatch(authToken, submissions[submissionId].account_id));
      dispatch(readProblem(authToken, submissions[submissionId].problem_id));
      setProblemId(submissions[submissionId].problem_id);
      setAccountId(submissions[submissionId].account_id);
    }
  }, [authToken, dispatch, problems.byId, submissionId, submissions]);

  useEffect(() => {
    if (problems.allIds !== [] && submissions[submissionId] !== undefined) {
      problems.allIds.filter((id) => {
        if (id === submissions[submissionId].problem_id) {
          dispatch(browseChallengeOverview(authToken, problems.byId[submissions[submissionId].problem_id].challenge_id));
          setChallengeId(problems.byId[submissions[submissionId].problem_id].challenge_id);
        }
        return '';
      });
    }
  }, [authToken, dispatch, problems, submissionId, submissions]);

  useEffect(() => {
    judgmentIds.filter((key) => {
      if (judgments[key].submission_id === parseInt(submissionId, 10)) {
        dispatch(browseJudgeCases(authToken, key));
        setJudgmentId(key);
      }
      return '';
    });
  }, [authToken, dispatch, judgmentIds, judgments, submissionId]);

  useEffect(() => {
    if (judgeCases.byId !== undefined) {
      judgeCases.allIds.map((id) => dispatch(readTestcase(authToken, id)));
    }
  }, [authToken, dispatch, judgeCases.allIds, judgeCases.byId]);

  useEffect(() => {
    if (testcaseIds !== [] && judgeCases.allIds !== []) {
      setTableData(
        judgeCases.allIds.filter((id) => judgeCases.byId[id].judgment_id === judgmentId).map((id) => ({
          id,
          no: testcaseIds.map((key) => (id === key ? testcases[key].input_filename.split('.')[0] : '')),
          time: judgeCases.byId[id].time_lapse,
          memory: judgeCases.byId[id].peak_memory,
          status: judgeCases.byId[id].status.toLowerCase().split(' ').map((word) => word[0].toUpperCase() + word.substring(1)).join(' '),
          score: judgeCases.byId[id].score,
        })),
      );
    }
  }, [judgeCases.allIds, judgeCases.byId, judgmentId, judgments.byId, testcaseIds, testcases]);

  useEffect(() => {
    user.classes.forEach((value) => {
      if (value.class_id === parseInt(classId, 10)) {
        if (value.role === 'MANAGER') {
          setRole('MANAGER');
        }
      }
    });
  }, [user.classes, classId]);

  if (challenges.byId[challengeId] === undefined
      || problems.byId[problemId] === undefined
      || submissions[submissionId] === undefined
      || judgmentIds === undefined
      || judgeCases.allIds === undefined
      || testcaseIds === undefined
      || accounts.byId[accountId] === undefined) {
    if (!loading.readProblem && !loading.readSubmissionDetail && !loading.browseChallengeOverview && !loading.readTestcase && !loading.browseJudgeCases) {
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
    dispatch(fetchSubmission(authToken, submissionId));
  };

  const handleRejudge = () => {
    // rejudge
    setPopUp(false);
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {submissionId}
        {' '}
        / Submission Detail
      </Typography>
      <div className={classNames.generalButtons}>
        {role === 'MANAGER'
        && <Button onClick={() => { setPopUp(true); }}>Rejudge</Button>}
        <Button color="primary" startIcon={<Icon.RefreshOutlinedIcon />} onClick={handleRefresh}>Refresh</Button>
      </div>
      <SimpleBar title="Submission Information">
        <AlignedText text="Submission ID" childrenType="text">
          <Typography variant="body1">{submissionId}</Typography>
        </AlignedText>
        <AlignedText text="Username" childrenType="text">
          <Typography variant="body1">{accounts.byId[accountId].username}</Typography>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">{accounts.byId[accountId].student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{accounts.byId[accountId].real_name}</Typography>
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
      <SimpleBar title="Submission Result">
        <SimpleTable
          isEdit={false}
          hasDelete={false}
          columns={[
            {
              id: 'no',
              label: 'No.',
              minWidth: 30,
              align: 'center',
              width: 400,
              type: 'string',
            },
            {
              id: 'time',
              label: 'Time(ms)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'memory',
              label: 'Memory(kb)',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'status',
              label: 'Status',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
            {
              id: 'score',
              label: 'Score',
              minWidth: 50,
              align: 'center',
              width: 600,
              type: 'string',
            },
          ]}
          data={tableData}
        />
      </SimpleBar>
      <SimpleBar title="Code">
        <CopyToClipboardButton text={submissions[submissionId].content} />
        <TextField
          className={classNames.codeField}
          value={submissions[submissionId].content}
          disabled
          multiline
          minRows={10}
          maxRows={20}
        />
      </SimpleBar>
      <Dialog maxWidth="md" open={popUp} onClose={() => { setPopUp(false); }}>
        <DialogTitle>
          <Typography variant="h4">Rejudge Submission</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Submission ID" childrenType="text">
            <Typography variant="body1">{submissionId}</Typography>
          </AlignedText>
          <Typography variant="body2">Once you rejudge a submission, the corresponding score and status may change.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPopUp(false); }}>Cancel</Button>
          <Button color="secondary" onClick={handleRejudge}>Rejudge</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
