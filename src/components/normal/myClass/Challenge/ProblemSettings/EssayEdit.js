import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SimpleBar from '../../../../ui/SimpleBar';
import Icon from '../../../../ui/icon/index';
import NoMatch from '../../../../noMatch';
import { editEssay } from '../../../../../actions/myClass/essay';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textfield: {
    width: '400px',
  },
  textfield2: {
    width: '60vw',
  },
}));

/* This is a level 4 component (page component) */
export default function EssayEdit({ closeEdit, role = 'NORMAL' }) {
  const {
    courseId, classId, challengeId, essayId,
  } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const essays = useSelector((state) => state.essays.byId);
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.essay);

  const [label, setLabel] = useState(essays[essayId] === undefined ? 'error' : essays[essayId].challenge_label);
  const [title, setTitle] = useState(essays[essayId] === undefined ? 'error' : essays[essayId].title);
  const [description, setDescription] = useState(essays[essayId] === undefined ? 'error' : essays[essayId].description);

  const handleClickSave = () => {
    const body = {
      label,
      title,
      description,
    };
    dispatch(editEssay(authToken, essayId, label, title, description));
    closeEdit();
  };

  return (
    <>
      <SimpleBar title="Label">
        <TextField
          value={label}
          variant="outlined"
          onChange={(e) => {
            setLabel(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Title">
        <TextField
          value={title}
          variant="outlined"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={classNames.textfield}
        />
      </SimpleBar>
      <SimpleBar title="Description">
        <TextField
          value={description}
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          minRows={10}
          maxRows={10}
          className={classNames.textfield2}
        />
      </SimpleBar>
      <div className={classNames.buttons}>
        <Button color="default" onClick={() => closeEdit()}>Cancel</Button>
        <Button color="primary" onClick={handleClickSave}>Save</Button>
      </div>
    </>
  );
}
