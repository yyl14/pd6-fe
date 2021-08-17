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
import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';
import SimpleTable from '../../../ui/SimpleTable';
import { browseChallengeOverview, editChallenge } from '../../../../actions/myClass/problem';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function ChallengeInfo() {
  const { courseId, classId, challengeId } = useParams();
  const history = useHistory();
  const classNames = useStyles();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(moment());
  const [status, setStatus] = useState('');

  const authToken = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.loading.myClass.problem);
  const challenges = useSelector((state) => state.challenges.byId);

  useEffect(() => {
    if (!loading.editChallenge) {
      dispatch(browseChallengeOverview(authToken, challengeId));
    }
  }, [authToken, challengeId, dispatch, loading.editChallenge]);

  useEffect(() => {
    if (challenges[challengeId] !== undefined) {
      if (currentTime.isBefore(moment(challenges[challengeId].start_time))) {
        setStatus('Not Yet');
      } else if (currentTime.isBefore(moment(challenges[challengeId].end_time))) {
        setStatus('Opened');
      } else {
        setStatus('Closed');
      }
    }
  }, [challengeId, challenges, currentTime]);

  if (challenges[challengeId] === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId].title}
        {' '}
        / Info
      </Typography>
      <SimpleBar
        title="Description"
      >
        <Typography variant="body1">{challenges[challengeId].description}</Typography>
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
