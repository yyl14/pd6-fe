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

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  label: {
    width: '500px',
  },
  title: {
    width: '500px',
  },
  description: {
    width: '500px',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function EssayManagerAdd() {
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
  const userId = useSelector((state) => state.user.id);

  const [addLabel, setAddLabel] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');

  const [popUpUpload, setPopUpUpload] = useState(false);

  const handleClickUpload = () => {
    setPopUpUpload(true);
  };
  const handleClosePopUpUpload = () => {
    setPopUpUpload(false);
  };

  const handleUpload = (e) => {

  };

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const handleClickSave = () => {
    const body = {
      title: addTitle,
      content: addDescription,
      author_id: userId,
    };
    console.log(body);
    // dispatch(addAnnouncement(authToken, body));
    // history.push to EssayManagerEdit
  };

  return (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {/* {problem.challenge_label} */}
        {' '}
        CM Add / Essay
      </Typography>
      <div>
        <SimpleBar
          title="Label"
        >
          <TextField
            className={classNames.label}
            value={addLabel}
            onChange={(e) => setAddLabel(e.target.value)}
          />
        </SimpleBar>
        <SimpleBar
          title="Title"
        >
          <TextField
            className={classNames.title}
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
          />
        </SimpleBar>
        <SimpleBar
          title="Description"
        >
          <TextField
            className={classNames.description}
            value={addDescription}
            onChange={(e) => setAddDescription(e.target.value)}
            multiline
            rows={4}
          />
        </SimpleBar>
        <AlignedText variant="body1" className={classNames.button}>
          <Button>Cancel</Button>
          <Button color="primary" onClick={handleClickSave}>Save</Button>
        </AlignedText>
      </div>
    </>
  );
}
