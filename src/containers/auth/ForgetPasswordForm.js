import { useState, useEffect } from 'react';
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
  makeStyles,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';
import { EmailOutlined, TrainRounded } from '@material-ui/icons';
import { userForgetPassword } from '../../actions/auth';

import '../../styles/auth.css';
import '../../styles/index.css';

const useStyles = makeStyles((theme) => ({
  authForm: {
    width: '50%',
  },
  authTextFields: {
    width: '100%',
    marginTop: '55px',
  },
  authButtons: {
    marginTop: '57px',
  },
}));

export default function ForgetPasswordForm() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth);
  const serverError = useSelector((state) => state.auth.error.forgetPassword);
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
    const status = event.target.value.indexOf('@') > 0;
    if (!status) {
      setEmail(event.target.value);
      setErrorText('Invalid email address');
      setError(true);
      setDisabled(true);
    } else {
      setEmail(event.target.value);
      setErrorText('');
      setError(false);
      setDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (error) {
      return;
    }
    userForgetPassword(email.trim());
    setPopUp(true);
  };

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  useEffect(() => {
    if (serverError === null) {
      setErrorText(serverError);
      setError(true);
      setDisabled(true);
    } else {
      setErrorText('');
      setError(false);
      setDisabled(false);
    }
  }, [serverError]);

  return (
    <>
      <Card className="auth-form login-form" variant="outlined">
        <CardContent className="auth-form-content">
          <form className={`auth-form-content ${classNames.authForm}`} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              // required
              className={`auth-form-input ${classNames.authTextFields}`}
              error={error}
              helperText={errorText}
              label="Registered / Alternative Email"
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <Button
              className={classNames.authButtons}
              disabled={disabled}
              type="submit"
              color="primary"
              onClick={(e) => handleSubmit(e)}
            >
              Send
            </Button>
          </form>
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
          <Typography variant="h4">Password reset email sent</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please check your mailbox to the account.</Typography>
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
