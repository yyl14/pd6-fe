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
  DialogContentText,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import AlignedText from '../../../ui/AlignedText';
import Icon from '../../../ui/icon/index';

import NoMatch from '../../../noMatch';
import GeneralLoading from '../../../GeneralLoading';

import { readChallenge, browseTasksUnderChallenge } from '../../../../actions/myClass/problem';
import { addProblem, addEssay, addPeerReview } from '../../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  selectItem: {
    display: 'flex',
  },
  selectedIcon: {
    transform: 'translateY(8px)',
  },
  selectedText: {
    transform: 'translateX(30px)',
  },
}));

/* This is a level 4 component (page component) */
export default function TaskAddingCard({ open, setOpen }) {
  const { courseId, classId, challengeId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const commonLoading = useSelector((state) => state.loading.common);

  const [type, setType] = useState('Coding Problem');
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleCreate = () => {
    if (label === '' || title === '') {
      return;
    }
    switch (type) {
      case 'Coding Problem': {
        dispatch(addProblem(authToken, challengeId, label, title));
        break;
      }
      case 'Essay(PDF)': {
        dispatch(addEssay(authToken, challengeId, label, title));
        break;
      }
      case 'Peer Review': {
        dispatch(addPeerReview(authToken, challengeId, label, title));
        break;
      }
      default: {
        break;
      }
    }

    setTimeout(() => {
      dispatch(browseTasksUnderChallenge(authToken, challengeId));
    }, 500);
    setOpen(false);
  };

  const checkDisabled = (curLabel, curTitle) => {
    if (curLabel === '' || curTitle === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchCourse(authToken, courseId));
    dispatch(readChallenge(authToken, challengeId));
  }, [authToken, challengeId, classId, courseId, dispatch]);

  if (loading.readChallenge || commonLoading.fetchCourse || commonLoading.fetchClass) {
    return <></>;
  }

  if (classes[classId] === undefined || courses[courseId] === undefined || challenges[challengeId] === undefined) {
    return <NoMatch />;
  }

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create New Task</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <AlignedText text="Class" childrenType="text">
              <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
            </AlignedText>
            <AlignedText text="Challenge" childrenType="text">
              <Typography>{`${challenges[challengeId].title}`}</Typography>
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
                    <Icon.Code />
                    Coding Problem
                  </MenuItem>
                  <MenuItem value="Essay(PDF)">
                    <Icon.Paper />
                    Essay(PDF)
                  </MenuItem>
                  <MenuItem value="Peer Review">
                    <Icon.Peerreview />
                    Peer Review
                  </MenuItem>
                  <MenuItem value="Coding Project">
                    <Icon.Project />
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
                  checkDisabled(e.target.value, title);
                }}
              />
            </AlignedText>
            <AlignedText text="Title" childrenType="field">
              <TextField
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  checkDisabled(label, e.target.value);
                }}
              />
            </AlignedText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={disabled} color="secondary" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
