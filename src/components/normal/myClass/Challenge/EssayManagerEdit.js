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
  TextField,
  Grid,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../ui/SimpleBar';
import Icon from '../../../ui/icon/index';
import AlignedText from '../../../ui/AlignedText';
import BrowseUploadArea from '../../../ui/BrowseUploadArea';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

export default function EssayManagerEdit(props) {
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const problem = useSelector((state) => state.problem.byId);
  const authToken = useSelector((state) => state.auth.token);
  // const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading.myClass.problem);

  const [editTitle, setEditTitle] = useState(props.editTitle);
  const [editDescription, setEditDescription] = useState(props.editDescription);
  const handleClickSave = () => {
    const body = {
      title: editTitle,
      description: editDescription,
    };
    // dispatch();
    props.setEdit(false);
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {/* {problem.challenge_label} */}
        {' '}
        CM Edit/ Essay
      </Typography>
      <SimpleBar
        title="Title"
      >
        <TextField defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
      </SimpleBar>
      <SimpleBar
        title="Description"
      >
        <TextField
          defaultValue={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          multiline
          rows={4}
        />
      </SimpleBar>
      <Button
        onClick={() => {
          props.setEdit(false);
        }}
      >
        Cancel
      </Button>
      <Button color="primary" onClick={handleClickSave}>
        Save
      </Button>
    </>
  );
}
