import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlignedText from '@/components/AlignedText';
import SimpleBar from '@/components/SimpleBar';
import useGrade from '@/lib/grade/useGrade';

interface GradeDeleteProps {
  courseId: string;
  classId: string;
  gradeId: string;
  username: string;
  title: string | undefined;
}

export default function GradeDelete({ courseId, classId, gradeId, username, title }: GradeDeleteProps) {
  const { deleteGrade, error } = useGrade(Number(gradeId));
  const history = useHistory();

  const [popUp, setPopUp] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteGrade({
        grade_id: Number(gradeId),
      });
      setPopUp(false);
      history.push(`/my-class/${courseId}/${classId}/grade`);
    } catch {
      setShowSnackBar(true);
    }
  };

  return (
    <>
      <SimpleBar
        title="Delete Grade"
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
        <Typography variant="body1">Once you delete a grade, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete Grade</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{username}</Typography>
          </AlignedText>
          <AlignedText text="Title" textColor="secondary" childrenType="text">
            <Typography variant="body1">{title}</Typography>
          </AlignedText>
          <Typography variant="body2" color="textPrimary">
            Once you delete a grade, there’s no going back. Please be certain
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        message={`Error: ${error.delete?.message}`}
      />
    </>
  );
}
