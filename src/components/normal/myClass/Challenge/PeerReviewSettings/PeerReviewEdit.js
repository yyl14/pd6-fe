import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import { editPeerReview } from '../../../../../actions/api/peerReview';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '400px',
  },
  textfield2: {
    width: '100%',
  },
  dialogTitle: {
    marginBottom: '-8px',
  },
  backToEditButton: {
    marginLeft: '24px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
// This page is for manager.
export default function PeerReviewEdit({ setEdit }) {
  const { courseId, classId, peerReviewId } = useParams();
  const classNames = useStyles();
  const dispatch = useDispatch();

  const peerReviews = useSelector((state) => state.peerReviews.byId);
  const problems = useSelector((state) => state.problem.byId);
  const challenges = useSelector((state) => state.challenges.byId);
  const authToken = useSelector((state) => state.auth.token);

  const [label, setLabel] = useState(
    peerReviews[peerReviewId] === undefined ? 'error' : peerReviews[peerReviewId].challenge_label,
  );
  const [title, setTitle] = useState(
    peerReviews[peerReviewId] === undefined ? 'error' : peerReviews[peerReviewId].title,
  );
  const [description, setDescription] = useState(
    peerReviews[peerReviewId] === undefined ? 'error' : peerReviews[peerReviewId].description,
  );
  const [hasChange, setHasChange] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const handleCancel = () => {
    if (hasChange) {
      setWarningPopUp(true);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    const body = {
      challenge_label: label,
      title,
      description,
    };
    dispatch(editPeerReview(authToken, peerReviewId, body));
    setEdit(false);
  };

  return (
    <>
      <SimpleBar title="Label" noIndent>
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
            setHasChange(true);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title" noIndent>
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
            setHasChange(true);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={description}
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
            setHasChange(true);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <SimpleBar title="Peer Review Information" noIndent>
        <AlignedText text="Task to be Reviewed" childrenType="text">
          <Typography variant="body1">
            <Link
              to={`/my-class/${courseId}/${classId}/challenge/${peerReviews[peerReviewId].target_challenge_id}/${peerReviews[peerReviewId].target_problem_id}`}
              className={classNames.textLink}
            >
              <Typography variant="body1">
                {`${
                  challenges[peerReviews[peerReviewId].target_challenge_id]
                && challenges[peerReviews[peerReviewId].target_challenge_id].title
                } / ${
                  problems[peerReviews[peerReviewId].target_problem_id]
                && problems[peerReviews[peerReviewId].target_problem_id].challenge_label
                }`}
              </Typography>
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Max Score" childrenType="text">
          <Typography variant="body1">{peerReviews[peerReviewId].max_score}</Typography>
        </AlignedText>
        <AlignedText text="Min Score" childrenType="text">
          <Typography variant="body1">{peerReviews[peerReviewId].min_score}</Typography>
        </AlignedText>
        <AlignedText text="Student is Assigned" childrenType="text">
          <Typography variant="body1">
            {`${peerReviews[peerReviewId].max_review_count} ${
              peerReviews[peerReviewId].max_review_count > 1 ? 'Peers' : 'Peer'
            } Respectively`}
          </Typography>
        </AlignedText>
      </SimpleBar>
      <div className={classNames.buttons}>
        <Button color="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>

      <Dialog open={warningPopUp} onClose={() => setWarningPopUp(false)} maxWidth="md">
        <DialogTitle id="dialog-slide-title" className={classNames.dialogTitle}>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classNames.dialogButtons}>
          <Button onClick={() => setWarningPopUp(false)} className={classNames.backToEditButton} variant="outlined">
            Back to Edit
          </Button>
          <div>
            <Button color="default" onClick={() => setEdit(false)}>
              Don’t Save
            </Button>
            <Button color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
