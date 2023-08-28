import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';

import SimpleBar from '@/components/ui/SimpleBar';
import usePeerReview from '@/lib/peerReview/usePeerReview';
import useChallengeTasks from '@/lib/task/useChallengeTasks';
import BasicInfo from '@/pages/PeerReview/components/BasicInfo';

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
      color: theme.palette.primary.dark,
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

export default function PeerReviewEdit({
  courseId,
  classId,
  challengeId,
  peerReviewId,
  setEdit,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  peerReviewId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classNames = useStyles();
  const { peerReview, editPeerReview } = usePeerReview(Number(peerReviewId));
  const { mutateTask } = useChallengeTasks(Number(challengeId));

  const [hasChange, setHasChange] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    challenge_label: peerReview?.challenge_label ?? 'error',
    title: peerReview?.title ?? 'error',
    description: peerReview?.description ?? 'error',
  });

  const handleDataChange = (value: string, name: keyof typeof updatedData) => {
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
    setHasChange(true);
  };

  const handleCancel = () => {
    if (hasChange) {
      setWarningPopUp(true);
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    await editPeerReview({ peer_review_id: Number(peerReviewId), ...updatedData });
    await mutateTask();
    setEdit(false);
  };

  return (
    <>
      <SimpleBar title="Label" noIndent>
        <TextField
          value={updatedData.challenge_label}
          variant="outlined"
          onChange={(e) => {
            handleDataChange(e.target.value, 'challenge_label');
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title" noIndent>
        <TextField
          value={updatedData.title}
          variant="outlined"
          onChange={(e) => {
            handleDataChange(e.target.value, 'title');
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description" noIndent>
        <TextField
          placeholder="(Text, LaTeX, Markdown and HTML supported)"
          value={updatedData.description}
          variant="outlined"
          onChange={(e) => {
            handleDataChange(e.target.value, 'description');
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <BasicInfo courseId={courseId} classId={classId} peerReviewId={peerReviewId} />
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
              {`Don't Save`}
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
