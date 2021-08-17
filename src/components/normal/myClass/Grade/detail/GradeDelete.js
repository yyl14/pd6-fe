import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import SimpleBar from '../../../../ui/SimpleBar';
import AlignedText from '../../../../ui/AlignedText';
import { deleteGrade } from '../../../../../actions/myClass/grade';

export default function GradeDelete(props) {
  const { gradeId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.token);

  const [popUp, setPopUp] = useState(false);

  const handleDelete = () => {
    setPopUp(false);
    // dispatch(deleteGrade(authToken, gradeId));
    history.goBack();
  };

  return (
    <>
      <SimpleBar
        title="Delete Grade"
        buttons={(
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
        )}
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
