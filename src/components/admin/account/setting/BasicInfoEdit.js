import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  const [userName] = useState(props.userName);
  const [inputs, setInputs] = useState({
    realName: props.realName,
    nickName: props.nickName,
    altMail: props.altMail ? props.altMail : '',
  });
  const [popUp, setPopUp] = useState(false);
  const [errors, setErrors] = useState({
    realName: false,
    nickName: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    realName: '',
    nickName: '',
  });
  const classes = useStyles();

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (inputs.realName === '' || inputs.nickName === '') {
      if (inputs.realName === '') {
        setErrors((ori) => ({ ...ori, realName: true }));
        setErrorTexts((ori) => ({ ...ori, realName: "Can't be empty" }));
      }
      if (inputs.nickName === '') {
        setErrors((ori) => ({ ...ori, nickName: true }));
        setErrorTexts((ori) => ({ ...ori, nickName: "Can't be empty" }));
      }
      return;
    }
    if (inputs.altMail !== props.altMail) {
      if (inputs.altMail !== '') {
        dispatch(editAccount(authToken, accountId, userName, inputs.realName, inputs.nickName, inputs.altMail));
        setPopUp(true);
        return;
      }
    }
    if ((inputs.altMail === '' && props.altMail === null) || inputs.altMail === props.altMail) {
      if (inputs.realName !== props.realName || inputs.nickName !== props.nickName) {
        dispatch(editAccount(authToken, accountId, userName, inputs.realName, inputs.nickName, null));
      }
    } else {
      dispatch(editAccount(authToken, accountId, userName, inputs.realName, inputs.nickName, ''));
    }

    props.handleBack();
  };

  const handleCancel = () => {
    props.handleBack();
    setErrors({ realName: false, nickName: false });
    setErrorTexts({ realName: '', nickName: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));

    if (name === 'realName' && value !== '') {
      setErrors((ori) => ({ ...ori, realName: false }));
      setErrorTexts((ori) => ({ ...ori, realName: '' }));
    }
    if (name === 'nickName' && value !== '') {
      setErrors((ori) => ({ ...ori, nickName: false }));
      setErrorTexts((ori) => ({ ...ori, nickName: '' }));
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
          <AlignedText text="Real name" childrenType="field" maxWidth="lg">
            <TextField
              name="realName"
              value={inputs.realName}
              variant="outlined"
              onChange={(e) => handleChange(e)}
              className={classes.textfield}
              error={errors.realName}
              helperText={errorTexts.realName}
            />
          </AlignedText>
          <AlignedText text="Nickname" childrenType="field" maxWidth="lg">
            <TextField
              name="nickName"
              value={inputs.nickName}
              onChange={(e) => handleChange(e)}
              className={classes.textfield}
              error={errors.nickName}
              helperText={errorTexts.nickName}
            />
          </AlignedText>
          <AlignedText text="Alternative Email" childrenType="field" maxWidth="lg">
            <TextField
              value={inputs.altMail}
              name="altMail"
              onChange={(e) => handleChange(e)}
              className={classes.textfield}
            />
          </AlignedText>
          <div className={classes.gap}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSave}>
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
          <Button
            onClick={() => {
              setPopUp(false);
              done();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
