import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { format } from 'date-fns';
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
import { useHistory, useParams } from 'react-router-dom';
import NoMatch from '../../../noMatch';
import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import { browseChallengeOverview, editChallenge, browseTasksUnderChallenge } from '../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  descriptionBlock: {
    width: '1000px',
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionField: {
    width: 'inherit',
  },
  buttons: {
    alignSelf: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeInfo() {
  const { courseId, classId, challengeId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(moment());
  const [status, setStatus] = useState('');
  const [isManager, setIsManager] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState('');

  const authToken = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const challenges = useSelector((state) => state.challenges.byId);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    if (!loading.editChallenge) {
      dispatch(browseChallengeOverview(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch, loading.editChallenge]);

  useEffect(() => {
    // dispatch(browseTasksUnderChallenge(authToken, challengeId));
  }, [authToken, challengeId, dispatch]);

  useEffect(() => {
    if (challenges[challengeId] !== undefined) {
      if (currentTime.isBefore(moment(challenges[challengeId].start_time))) {
        setStatus('Not Yet');
      } else if (currentTime.isBefore(moment(challenges[challengeId].end_time))) {
        setStatus('Opened');
      } else {
        setStatus('Closed');
      }
      setInputs(challenges[challengeId].description);
    }
  }, [challengeId, challenges, currentTime]);

  useEffect(() => {
    userClasses.map((item) => {
      if (`${item.class_id}` === classId) {
        console.log(item.role);
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, userClasses]);

  if (challenges[challengeId] === undefined) {
    if (!loading.browseChallengeOverview) {
      return <NoMatch />;
    }
    return <div>loading...</div>;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setInputs(challenges[challengeId].description);
  };

  const handleSave = () => {
    const body = ({
      publicizeType: challenges[challengeId].publicize_type,
      selectionType: challenges[challengeId].selection_type,
      title: challenges[challengeId].title,
      description: inputs,
      startTime: challenges[challengeId].start_time,
      endTime: challenges[challengeId].end_time,
    });
    dispatch(editChallenge(authToken, challengeId, body));
    setEditMode(false);
    setInputs(challenges[challengeId].description);
  };

  return (
    <>
      <Typography className={classes.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        / Info
      </Typography>
      {isManager && !editMode
        && (
        <Button
          onClick={handleEdit}
        >
          Edit
        </Button>
        )}
      <SimpleBar
        title="Description"
      >
        {editMode
          ? (
            <div className={classes.descriptionBlock}>
              <TextField
                className={classes.descriptionField}
                value={inputs}
                onChange={(e) => setInputs(e.target.value)}
                multiline
                rows={10}
              />
              <div className={classes.buttons}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
              </div>
            </div>
          )
          : <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>{challenges[challengeId].description}</Typography>}
      </SimpleBar>
      <SimpleBar
        title="Challenge Information"
      >
        <>
          <AlignedText text="Scored by" childrenType="text">
            <Typography variant="body1">
              {challenges[challengeId].selection_type === 'LAST'
                ? 'Last Score'
                : 'Highest Score'}
            </Typography>
          </AlignedText>
          <AlignedText text="Status" childrenType="text">
            <Typography variant="body1">{status}</Typography>
          </AlignedText>
          <AlignedText text="Start time" childrenType="text">
            <Typography variant="body1">{moment(challenges[challengeId].start_time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
          <AlignedText text="End time" childrenType="text">
            <Typography variant="body1">{moment(challenges[challengeId].end_time).format('YYYY-MM-DD, HH:mm')}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
      <SimpleBar
        title="Overview"
      >
        {/* <SimpleTable */}
      </SimpleBar>
    </>
  );
}
