import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import SimpleBar from '../ui/SimpleBar';
import AlignedText from '../ui/AlignedText';
import { editAccount } from '../../actions/user/user';

const useStyles = makeStyles(() => ({
  textfield: {
    width: '350px',
  },
}));

export default function BasicInfoEdit(props) {
  const [realName] = useState(props.realName);
  const [userName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail ? props.altMail : '');
  const classes = useStyles();
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const accountId = useSelector((state) => state.user.id);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (nickName === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
    if (altMail !== props.altMail) {
      if (altMail !== '') {
        dispatch(editAccount(authToken, accountId, userName, realName, nickName, altMail));
        setPopUp(true);
        return;
      }
    }
    if ((altMail === '' && props.altMail === null) || altMail === props.altMail) {
      dispatch(editAccount(authToken, accountId, userName, realName, nickName, null));
    } else {
      dispatch(editAccount(authToken, accountId, userName, realName, nickName, ''));
    }
    props.handleBack();
  };

  const handleCancel = () => {
    props.handleBack();
    setError(false);
    setErrorText('');
  };

  const handleNicknameChange = (e) => {
    setNickName(e.target.value);
    if (e.target.value !== '') {
      setError(false);
      setErrorText('');
    }
  };

  const done = () => {
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{userName}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text" maxWidth="lg">
            <Typography variant="body1">{realName}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField
              value={nickName}
              // onChange={(e) => {
              //   setNickName(e.target.value);
              // }}
              onChange={handleNicknameChange}
              className={classes.textfield}
              error={error}
              helperText={errorText}
            />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField
              value={altMail}
              onChange={(e) => {
                setAltMail(e.target.value);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button color="primary" type="submit" onClick={handleSave}>
            Save
          </Button>
        </>
      </SimpleBar>
      <Dialog open={popUp} keepMounted onClose={() => setPopUp(false)}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Verification email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your mailbox to activate this alternative email, then it will appear here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPopUp(false);
              done();
            }}
            color="default"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
