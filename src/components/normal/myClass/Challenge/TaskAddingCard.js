import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';
import NoMatch from '../../../noMatch';

import {
  addProblem,
  addEssay,
  addPeerReview,
  browseTasksUnderChallenge,
  peerReviewFetchChallenges,
} from '../../../../actions/myClass/challenge';
import { readProblemInfo } from '../../../../actions/myClass/problem';

const useStyles = makeStyles(() => ({
  selectedIcon: {
    marginRight: '20px',
  },
  peerReviewCard_display: {
    display: 'block',
  },
  peerReviewCard_hide: {
    display: 'none',
  },
  peerBottomText: {
    marginLeft: '10px',
    marginTop: '18px',
  },
}));

/* This is a level 4 component (page component) */
export default function TaskAddingCard({ open, setOpen }) {
  const { courseId, classId, challengeId } = useParams();
  const classNames = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const challenges = useSelector((state) => state.challenges);
  const authToken = useSelector((state) => state.auth.token);
  const problems = useSelector((state) => state.problem);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const commonLoading = useSelector((state) => state.loading.common);

  const [type, setType] = useState('Coding Problem');
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [peerReviewChallengeId, setPeerReviewChallengeId] = useState();
  const [peerReviewChallengeIds, setPeerReviewChallengeIds] = useState([]);
  const [taskLabel, setTaskLabel] = useState();
  const [taskId, setTaskId] = useState([]);
  const [maxScore, setMaxScore] = useState(3);
  const [minScore, setMinScore] = useState(1);
  const [peerNumbers, setPeerNumbers] = useState();

  useEffect(() => {
    if (!loading.addProblem && !loading.addEssay && !loading.addPeerReview) {
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch, loading.addEssay, loading.addPeerReview, loading.addProblem]);

  useEffect(() => {
    if (label !== '' && title !== '') {
      setDisabled(false);
    } else setDisabled(true);
  }, [label, title]);

  useEffect(() => {
    dispatch(peerReviewFetchChallenges(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    const temp = challenges.allIds.filter((id) => challenges.byId[id].class_id === Number(classId));
    setPeerReviewChallengeIds(temp);
  }, [challenges.allIds, challenges.byId, classId]);

  // useEffect(() => {
  //   peerReviewChallengeIds.map((id) => dispatch(browseTasksUnderChallenge(authToken, id)));
  // });

  useEffect(() => {
    console.log('challenges:', challenges);
  }, [challenges]);

  const handleCreate = () => {
    switch (type) {
      case 'Coding Problem': {
        dispatch(addProblem(authToken, challengeId, label, title, history, courseId, classId));
        break;
      }
      case 'Essay(PDF)': {
        dispatch(addEssay(authToken, challengeId, label, title, history, courseId, classId));
        break;
      }
      case 'Peer Review': {
        dispatch(addPeerReview(authToken, challengeId, label, title, history, courseId, classId));
        break;
      }
      default: {
        break;
      }
    }
    setType('Coding Problem');
    setTitle('');
    setLabel('');
    setDisabled(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setType('Coding Problem');
    setTitle('');
    setLabel('');
    setDisabled(true);
    setOpen(false);
  };

  if (loading.readChallenge || commonLoading.fetchCourse || commonLoading.fetchClass) {
    return <></>;
  }

  if (classes[classId] === undefined || courses[courseId] === undefined || challenges.byId[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create New Task</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
          </AlignedText>
          <AlignedText text="Challenge" childrenType="text">
            <Typography>{`${challenges.byId[challengeId].title}`}</Typography>
          </AlignedText>
          <AlignedText text="Type" childrenType="field">
            <FormControl variant="outlined">
              <Select
                labelId="sort"
                id="sort"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                style={{ width: '350px' }}
              >
                <MenuItem value="Coding Problem">
                  <Icon.Code className={classNames.selectedIcon} />
                  Coding Problem
                </MenuItem>
                <MenuItem value="Essay(PDF)">
                  <Icon.Paper className={classNames.selectedIcon} />
                  Essay(PDF)
                </MenuItem>
                <MenuItem value="Peer Review">
                  <Icon.Peerreview className={classNames.selectedIcon} />
                  Peer Review
                </MenuItem>
                <MenuItem value="Coding Project" disabled>
                  <Icon.Project className={classNames.selectedIcon} />
                  Coding Project
                </MenuItem>
              </Select>
            </FormControl>
          </AlignedText>
          <AlignedText text="Label" childrenType="field">
            <TextField
              id="label"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </AlignedText>
          <AlignedText text="Title" childrenType="field">
            <TextField
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </AlignedText>
          <div className={type === 'Peer Review' ? classNames.peerReviewCard_display : classNames.peerReviewCard_hide}>
            <hr />
            <h3>Peer Review Task</h3>
            <AlignedText text="Challenge" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="sort"
                  id="sort"
                  value={peerReviewChallengeId}
                  onChange={(e) => {
                    setPeerReviewChallengeId(e.target.value);
                  }}
                  style={{ width: '350px' }}
                >
                  {peerReviewChallengeIds.map((id) => (
                    <MenuItem key={id} value={id}>
                      {challenges.byId[id].title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Task Label" childrenType="field">
              <FormControl variant="outlined">
                <Select
                  labelId="sort"
                  id="sort"
                  value={taskLabel}
                  onChange={(e) => {
                    setTaskLabel(e.target.value);
                  }}
                  style={{ width: '350px' }}
                >
                  <MenuItem value="hi">hi</MenuItem>
                  {/* {probleID.map((id) => (
                  <MenuItem value={problems.byId[id].challenge_label}>{problems.byId[id].challenge_label}</MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </AlignedText>
            <AlignedText text="Max Score" childrenType="field">
              <TextField
                id="maxScore"
                value={maxScore}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setMaxScore(e.target.value);
                }}
              />
            </AlignedText>
            <AlignedText text="Min Score" childrenType="field">
              <TextField
                id="minScore"
                value={minScore}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setMinScore(e.target.value);
                }}
              />
            </AlignedText>
            <AlignedText text="Student is Assigned" childrenType="field">
              <TextField
                id="peerNumbers"
                value={peerNumbers}
                style={{ width: '150px' }}
                onChange={(e) => {
                  setPeerNumbers(e.target.value);
                }}
              />
              <Typography className={classNames.peerBottomText}>Peers Respectively</Typography>
            </AlignedText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button disabled={disabled} color="primary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
