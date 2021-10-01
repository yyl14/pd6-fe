import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { MathpixMarkdown, MathpixLoader } from 'mathpix-markdown-it';

import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';
import PageTitle from '../../../../ui/PageTitle';

import BasicInfo from './Element/BasicInfo';
import ReceiverInfo from './Element/ReceiverInfo';
import GraderInfo from './Element/GraderInfo';
import ProblemDescription from './Element/ProblemDescription';
import CodeArea from '../../../../ui/CodeArea';
import NoMatch from '../../../../noMatch';
import GeneralLoading from '../../../../GeneralLoading';

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
    classId, challengeId, peerReviewId, accountId, recordId,
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
    setEdit(false);
  };

  useEffect(() => {
    setScore(peerReviewRecords[recordId].score);
    setComment(peerReviewRecords[recordId].comment);
  }, [peerReviewRecords, recordId]);

  useEffect(() => {
    setScoreRange(Array.from(new Array(peerReviews[peerReviewId].max_score - peerReviews[peerReviewId].min_score + 1), (x, i) => i + peerReviews[peerReviewId].min_score));
  }, [peerReviewId, peerReviews]);

  useEffect(() => {
    const newRole = userClasses.filter((item) => item.class_id === Number(classId))[0].role;
    if (newRole !== null || newRole !== undefined) {
      setRole(newRole);
    }
  }, [classId, userClasses]);

  if (challenges[challengeId] === undefined) {
    if (commonLoading.fetchChallenge) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      {role === 'MANAGER'
        ? <PageTitle text={`Peer Review Detail / Peer ${peerId}`} />
        : <PageTitle text={`${challenges[challengeId].title} / ${peerReviews[peerReviewId].challenge_label} / Peer ${peerId}`} />}

      {!edit && role === 'NORMAL' && <Button onClick={() => setEdit(true)}>Edit</Button>}

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
            <ReceiverInfo accountId={6} />
            <GraderInfo accountId={6} reviewedTime="2021-10-01T12:07:22.478Z" />
          </>
          )}
      <ProblemDescription />
      <SimpleBar title="Code" noIndent>
        <CodeArea value="" />
      </SimpleBar>
      {edit
        ? (
          <>
            <SimpleBar title="Score" noIndent>
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
            </SimpleBar>
            <SimpleBar title="Comment" noIndent>
              <TextField
                value={comment}
                variant="outlined"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className={classes.textfield}
              />
              {`${peerReviewRecords[recordId].comment}`}
            </SimpleBar>
          </>
        ) : (
          <>
            <SimpleBar title="Score">
              {`${peerReviewRecords[recordId].score}`}
            </SimpleBar>
            <SimpleBar title="Comment">
              {`${peerReviewRecords[recordId].comment}`}
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
        )}
    </>
  );
}
