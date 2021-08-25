import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import { editAccount } from '../../../../actions/admin/account';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
  gap: {
    marginTop: theme.spacing(2),
  },
}));

export default function BasicInfoEdit(props) {
  const [realName, setRealName] = useState(props.realName);
  const [userName, setUserName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail ? props.altMail : '');
  // const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const classes = useStyles();

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (altMail !== props.altMail) {
      if (altMail !== '') {
        dispatch(editAccount(authToken, accountId, userName, realName, nickName, altMail));
        setPopUp(true);
        return;
      }
    }
    if ((altMail === '' && props.altMail === null) || (altMail === props.altMail)) {
      if (realName !== props.realName || nickName !== props.nickName) {
        dispatch(editAccount(authToken, accountId, userName, realName, nickName, null));
      }
    } else {
      dispatch(editAccount(authToken, accountId, userName, realName, nickName, ''));
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
          <AlignedText text="Real name" childrenType="field" maxWidth="lg">
            <TextField
              value={realName}
              variant="outlined"
              onChange={(e) => {
                setRealName(e.target.value);
              }}
              className={classes.textfield}
            />
          </AlignedText>
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              className={classes.textfield}
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
          <div className={classes.gap}>
            <Button onClick={() => props.handleBack()}>Cancel</Button>
            <Button
              color="primary"
              type="submit"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
      <Dialog open={popUp} onClose={() => setPopUp(false)} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Verification email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" color="textPrimary">
              Please check your mailbox to activate this alternative email, then it will appear here.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setPopUp(false); done(); }}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
