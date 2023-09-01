import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useTeam from '@/lib/team/useTeam';

interface TeamDeleteProp {
  courseId: string;
  classId: string;
  teamId: string;
  teamName: string;
  label: string;
}

export default function TeamDelete({ courseId, classId, teamId, teamName, label }: TeamDeleteProp) {
  const history = useHistory();
  const { deleteTeam, error: teamError } = useTeam(Number(teamId));

  const [popUp, setPopUp] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTeam({
        team_id: Number(teamId),
      });
      history.push(`/my-class/${courseId}/${classId}/team`);
      setPopUp(false);
    } catch {
      setErrorPopup(true);
    }
  };

  return (
    <div>
      <SimpleBar
        title="Delete Team"
        childrenButtons={
          <>
            <Button
              color="secondary"
              onClick={() => {
                setPopUp(true);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <Typography>Once you delete a team, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete Team</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <AlignedText text="Team Name" childrenType="text" textColor="secondary">
              <Typography>{teamName}</Typography>
            </AlignedText>
            <AlignedText text="Label" childrenType="text" textColor="secondary">
              <Typography>{label}</Typography>
            </AlignedText>
            <Typography variant="body2" color="textPrimary">
              Once you delete a team, there is no going back. Please be certain.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorPopup}
        onClose={() => setErrorPopup(false)}
        message={`Error: ${teamError.delete?.message}`}
        key="errorMsg"
      />
    </div>
  );
}
