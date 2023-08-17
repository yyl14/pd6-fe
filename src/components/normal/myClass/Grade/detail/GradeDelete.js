import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteGrade } from '../../../../../actions/myClass/grade';
import AlignedText from '../../../../ui/AlignedText';
import SimpleBar from '../../../../ui/SimpleBar';

export default function GradeDelete(props) {
  const { courseId, classId, gradeId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.grade);

  const [popUp, setPopUp] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  const handleDelete = () => {
    dispatch(deleteGrade(authToken, gradeId));
    setHasRequest(true);
  };

  useEffect(() => {
    if (hasRequest && !loading.deleteGrade) {
      setPopUp(false);
      history.push(`/my-class/${courseId}/${classId}/grade`);
    }
  }, [hasRequest, loading.deleteGrade, history, courseId, classId]);

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
            <Typography variant="body1">{props.username}</Typography>
          </AlignedText>
          <AlignedText text="Title" textColor="secondary" childrenType="text">
            <Typography variant="body1">{props.title}</Typography>
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
    </>
  );
}
