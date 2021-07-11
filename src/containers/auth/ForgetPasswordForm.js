import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';
import { EmailOutlined, TrainRounded } from '@material-ui/icons';
import { authActions } from '../../actions/index';

import '../../styles/auth.css';
import '../../styles/index.css';

function checkEmailFormat(email) {
  // console.log('checkEmailFormat: ', email.indexOf('@ntu.edu.tw'));
  const index1 = email.indexOf('@ntu.edu.tw'); // 台大
  const index2 = email.indexOf('@mail.ntust.edu.tw'); // 台科大
  const index3 = email.indexOf('@ntnu.edu.tw'); // 台師大
  if (email === '') {
    return '';
  }
  if (index1 <= 0 && index2 <= 0 && index3 <= 0) {
    return 'Invalid email address';
  }
  return '';
}

export default function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const { userForgetPassword } = bindActionCreators(authActions, dispatch);
  const loginState = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === '') {
      setEmail(event.target.value);
      setErrorText('');
      setError(false);
      setDisabled(true);
      return;
    }
    const status = checkEmailFormat(event.target.value);
    if (status === 'Invalid email address') {
      setEmail(event.target.value);
      setErrorText(status);
      setError(true);
      setDisabled(true);
    } else {
      setEmail(event.target.value);
      setErrorText('');
      setError(false);
      setDisabled(false);
    }
  };

  const handleSubmit = () => {
    if (error) {
      return;
    }
    userForgetPassword(email);
    setPopUp(true);
  };

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  return (
    <>
      <Card className="auth-form login-form" variant="outlined">
        <CardContent className="auth-form-content">
          <TextField
            // required
            className="auth-form-input"
            error={error}
            helperText={errorText}
            label="Email"
            value={email}
            onChange={(e) => handleChange(e)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') handleSubmit();
            }}
          />
          <Button
            disabled={disabled}
            type="submit"
            color="primary"
            onClick={() => handleSubmit()}
            onKeyPress={() => handleSubmit()}
          >
            Send
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={popUp}
        keepMounted
        onClose={() => handleClosePopUp()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h2">Password reset email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please check your mailbox to reset your password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
