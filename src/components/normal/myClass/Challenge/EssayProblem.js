import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  withStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';

import EssayInfo from './ProblemSettings/EssayInfo';
import EssayEdit from './ProblemSettings/EssayEdit';
import { readEssay } from '../../../../actions/myClass/essay';
import { fetchChallenges } from '../../../../actions/myClass/challenge';
import { downloadAllEssaySubmission } from '../../../../actions/myClass/essaySubmission';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function EssayProblem() {
  const { courseId, classId, challengeId, essayId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const userClasses = useSelector((state) => state.user.classes);
  const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes.byId);
  const essays = useSelector((state) => state.essays.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);
  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);
  const [emailSentPopup, setEmailSentPopup] = useState(false);

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const [popUp, setPopUpUp] = useState(false);

  const handleClickDownload = () => {
    setPopUpUp(true);
  };
  const handleClosePopUp = () => {
    setPopUpUp(false);
  };

  const handleDownload = () => {
    dispatch(downloadAllEssaySubmission(authToken, essayId, true));
    setEmailSentPopup(true);
  };

  useEffect(() => {
    dispatch(fetchChallenges(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    userClasses.forEach((value) => {
      if (value.class_id === parseInt(classId, 10)) {
        if (value.role === 'MANAGER') {
          setRole('MANAGER');
        }
      }
    });
  }, [classId, userClasses]);
  useEffect(() => {
    dispatch(readEssay(authToken, essayId));
  }, [authToken, dispatch, essayId]);

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {challenges[challengeId] === undefined ? 'error' : challenges[challengeId].title}
        {' / '}
        {essays[essayId] === undefined ? 'error' : essays[essayId].challenge_label}
      </Typography>
      {!edit && role === 'MANAGER' && (
        <div className={classNames.managerButtons}>
          <Button onClick={() => setEdit(true)}>Edit</Button>
          <StyledButton variant="outlined" component="span" startIcon={<Icon.Download />} onClick={handleClickDownload}>
            Download
          </StyledButton>
        </div>
      )}
      {edit ? <EssayEdit closeEdit={handleCloseEdit} role={role} /> : <EssayInfo role={role} />}
      {/* Upload dialog */}
      <Dialog open={popUp} keepMounted onClose={handleClosePopUp} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Download All Files</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="textPrimary">
            <AlignedText text="Class" childrenType="text">
              <Typography>{`${courses[courseId].name} ${classes[classId].name}`}</Typography>
            </AlignedText>
            <AlignedText text="Challenge" childrenType="text">
              <Typography>{challenges[challengeId].title}</Typography>
            </AlignedText>
            <AlignedText text="Task Label" childrenType="text">
              <Typography>{essays[essayId].challenge_label}</Typography>
            </AlignedText>
            <AlignedText text="Download Options" childrenType="text">
              <Typography>All users&apos; last submissioin</Typography>
            </AlignedText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()}>Cancel</Button>
          <Button onClick={() => handleDownload()} color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={emailSentPopup} keepMounted onClose={() => setEmailSentPopup(false)}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">All Essay Submissions sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Please check your mailbox.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailSentPopup(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
