import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';

import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import PageTitle from '../../../../ui/PageTitle';

import BasicInfo from './Element/BasicInfo';
import ReceiverInfo from './Element/ReceiverInfo';
import GraderInfo from './Element/GraderInfo';
import CodeArea from '../../../../ui/CodeArea';
import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

import { browseAccountReviewedPeerReviewRecord } from '../../../../../actions/api/peerReview';

const useStyles = makeStyles(() => ({
  textfield: {
    width: '400px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
// This page is for both normal and manager.
// Render different component according to role and call correct api.
// If normal, account id should be himself.
// Only normal has edit mode.
export default function ReviewedRecord() {
  const {
    courseId, classId, challengeId, peerReviewId, accountId, recordId,
  } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [role, setRole] = useState('GUEST');
  const [edit, setEdit] = useState(false);
  const [peerId, setPeerId] = useState(1);
  const [scoreRange, setScoreRange] = useState([]);
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.api.peerReviews);
  const error = useSelector((state) => state.error.api.peerReviews);
  const commonLoading = useSelector((state) => state.loading.common.common);
  const userClasses = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const problems = useSelector((state) => state.problem.byId);
  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const peerReviewRecords = useSelector((state) => state.peerReviewRecords.byId);

  const handleSubmit = () => {
    console.log(score);
    // dispatch submit review result
    setEdit(false);
  };

  useEffect(() => {
    setScore(peerReviewRecords[recordId].score);
    setComment(peerReviewRecords[recordId].comment);
  }, [peerReviewRecords, recordId]);

  useEffect(() => {
    setScoreRange(Array.from(new Array(peerReviews[peerReviewId].max_score - peerReviews[peerReviewId].min_score + 1), (x, i) => i + peerReviews[peerReviewId].min_score));
    const id = peerReviews[peerReviewId].reviewRecordIds.findIndex((element) => element === recordId);
    if (id !== -1) {
      setPeerId(peerReviews[peerReviewId].reviewRecordIds[id]);
    }
  }, [peerReviewId, peerReviews, recordId]);

  useEffect(() => {
    const newRole = userClasses.filter((item) => item.class_id === Number(classId))[0].role;
    if (newRole !== null || newRole !== undefined) {
      setRole(newRole);
    }
  }, [classId, userClasses]);

  useEffect(() => {
    // dispatch read review ids for this account
    dispatch(browseAccountReviewedPeerReviewRecord(authToken, peerReviewId, accountId));
    // dispatch read record with code
    // if manager, must read receiver and grader info at the same time
    // dispatch read problem info
  }, [accountId, authToken, dispatch, peerReviewId]);

  if (challenges[challengeId] === undefined || peerReviews[peerReviewId] === undefined || peerReviewRecords[recordId] === undefined) {
    if (commonLoading.fetchChallenge) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  if (role === 'GUEST') {
    return <NoMatch />;
  }

  return (
    <>
      {role === 'MANAGER'
        ? <PageTitle text={`Peer Review Detail / Peer ${peerId}`} />
        : <PageTitle text={`${challenges[challengeId].title} / ${peerReviews[peerReviewId].challenge_label} / Peer ${peerId}`} />}

      {role === 'NORMAL'
                && (
                <SimpleBar title="Original Problem">
                  <Link target="_blank" to={`/my-class/${courseId}/${classId}/challenge/${challengeId}/${peerReviews[peerReviewId].setter_id}`}>
                    {`${challenges[challengeId].title}`}
                  </Link>
                </SimpleBar>
                )}

      {role === 'MANAGER' ? <BasicInfo />
        : (
          <SimpleBar title="Description">
            <MathpixLoader>
              <MathpixMarkdown text={peerReviews[peerReviewId].description} htmlTags />
            </MathpixLoader>
          </SimpleBar>
        )}
      {role === 'MANAGER'
          && (
          <>
            <ReceiverInfo accountId={peerReviewRecords[recordId].receiver_id} />
            <GraderInfo accountId={peerReviewRecords[recordId].grader_id} reviewedTime={peerReviewRecords[recordId].submit_time} />
          </>
          )}

      <SimpleBar title="Code" noIndent>
        <CodeArea value={peerReviewRecords[recordId].code} />
      </SimpleBar>
      {role === 'MANAGER'
          && (
          <>
            <SimpleBar title="Score">
              {`${peerReviewRecords[recordId].score}`}
            </SimpleBar>
            <SimpleBar title="Comment">
              {`${peerReviewRecords[recordId].comment}`}
            </SimpleBar>
          </>
          )}
      {role === 'NORMAL' && edit ? (
        <>
          <SimpleBar title="Review" noIndent>
            <AlignedText text="Score" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="score"
                  id="score"
                  value={score}
                  onChange={(e) => {
                    setScore(e.target.value);
                  }}
                >
                  {scoreRange.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AlignedText>
            <TextField
              value={comment}
              variant="outlined"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className={classes.textfield}
            />
            <AlignedText text="Comment" childrenType="text" />
          </SimpleBar>
          <div className={classes.buttons}>
            <Button color="default" onClick={() => { setEdit(false); }}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </>
      ) : (
        <>
          <SimpleBar title="Review" buttons={<Button onClick={() => setEdit(true)}>Edit</Button>}>
            <AlignedText text="Score" childrenType="text">
              <Typography variant="body1">
                {`${peerReviewRecords[recordId].score}`}
              </Typography>
            </AlignedText>
            <AlignedText text="Comment" childrenType="text">
              <Typography variant="body1">
                {`${peerReviewRecords[recordId].comment}`}
              </Typography>
            </AlignedText>
          </SimpleBar>
          <SimpleBar title="Comment" />
        </>
      )}
    </>
  );
}
