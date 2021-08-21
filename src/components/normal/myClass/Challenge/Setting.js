import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import moment from 'moment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useParams } from 'react-router-dom';

import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';
import { fetchChallenges } from '../../../../actions/myClass/challenge';
// import { fetchClass } from '../../../../actions/common/common';
import NoMatch from '../../../noMatch';
import SettingEdit from './SettingEdit';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function Setting() {
  const { classId, challengeId } = useParams();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const userClass = useSelector((state) => state.user.classes);
  const challenges = useSelector((state) => state.challenges.byId);
  const loading = useSelector((state) => state.loading.myClass.challenge.fetchChallenges);

  const [challenge, setChallenge] = useState(undefined);
  const [classTitle, setClassTitle] = useState('');

  useEffect(() => {
    dispatch(fetchChallenges(authToken, classId));
    // dispatch(fetchClass(authToken, classId));
  }, [authToken, dispatch, classId]);

  useEffect(() => {
    if (challenge === undefined) {
      setChallenge(challenges[challengeId]);
      console.log('challenge :', challenges[challengeId]);
    }
  }, [challenge, challenges, challengeId]);

  useEffect(() => {
    if (userClass[classId] !== undefined) {
      setClassTitle(userClass[classId].name);
    }
  }, [userClass, classId]);

  const [edit, setEdit] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const handleDelete = () => {
    console.log('call delete challenge api');
    setWarningPopUp(false);
  };

  if (challenge === undefined) {
    if (loading) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${challenge.title} / Setting`}
      </Typography>

      {edit ? (
        <SettingEdit
          challengeId={challengeId}
          challenge={challenge}
          setEdit={setEdit}
        />
      ) : (
        <>
          <Button onClick={() => setEdit(true)}>
            Edit
          </Button>

          <SimpleBar title="Information">
            <AlignedText text="Title" maxWidth="lg" childrenType="text">
              <Typography variant="body1">{challenge.title}</Typography>
            </AlignedText>
            <AlignedText text="Duration" maxWidth="lg" childrenType="text">
              <Typography variant="body1">
                {moment(challenge.start_time).format('YYYY/MM/DD HH:mm')}
                <ArrowRightIcon style={{ transform: 'translate(0, 5px)' }} />
                {moment(challenge.end_time).format('YYYY/MM/DD HH:mm')}
              </Typography>
            </AlignedText>
            <AlignedText text="Score by" maxWidth="lg" childrenType="text">
              <Typography variant="body1">
                {challenge.selection_type === 'LAST'
                  ? 'Last Score'
                  : 'Highest Score'}
              </Typography>
            </AlignedText>
            <AlignedText text="Shown in Problem Set" maxWidth="lg" childrenType="text">
              <Typography variant="body1">
                {challenge.publicize_type === 'START_TIME'
                  ? 'On Start Time'
                  : 'On End Time'}
              </Typography>
            </AlignedText>
          </SimpleBar>

          <SimpleBar
            title="Delete Challenge"
            childrenButtons={(
              <>
                <Button color="secondary" onClick={() => setWarningPopUp(true)}>
                  Delete
                </Button>
              </>
            )}
          >
            <Typography variant="body1">
              Once you delete a challenge, there is no going back. Please be certain.
            </Typography>
          </SimpleBar>
        </>
      )}
      <Dialog
        open={warningPopUp}
        onClose={() => setWarningPopUp(false)}
        fullWidth
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">
            Delete Changes
          </Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="lg" childrenType="text" textColor="secondary">
            <Typography variant="body1">{classTitle}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="lg" childrenType="text" textColor="secondary">
            <Typography variant="body1">{challenge.title}</Typography>
          </AlignedText>
          <Typography variant="body2">
            Once you delete a challenge, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setWarningPopUp(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
