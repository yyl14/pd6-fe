import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import SimpleBar from '../ui/SimpleBar';
import AlignedText from '../ui/AlignedText';
import { editAccount } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
}));

export default function BasicInfoEdit(props) {
  const [realName, setRealName] = useState(props.realName);
  const [userName, setUserName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail ? props.altMail : '');
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();

  const accountId = useSelector((state) => state.auth.user.id);
  const authToken = useSelector((state) => state.auth.user.token);
  const dispatch = useDispatch();

  const [popUp, setPopUp] = useState(false);

  const handleSave = () => {
    dispatch(editAccount(authToken, accountId, userName, realName, nickName, altMail));
    if (altMail !== props.altMail) {
      setPopUp(true);
      return;
    }
    props.handleBack();
  };

  const done = () => {
    props.handleBack();
  };

  return (
    <div>
      <SimpleBar
        title="Basic Information"
      >
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
              onChange={(e) => {
                setNickName(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField
              value={altMail}
              onChange={(e) => {
                setAltMail(e.target.value);
                setDisabled(false);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <Button onClick={() => props.handleBack()}>Cancel</Button>
          <Button
            color="primary"
            type="submit"
            disabled={disabled}
            onClick={handleSave}
          >
            Save
          </Button>
        </>
      </SimpleBar>
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Verification email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your mailbox to activate this alternative email, then it will appear here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPopUp(false); done(); }} color="default">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
