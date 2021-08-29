import { useState, useEffect } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { userForgetPassword } from '../../actions/user/auth';

import '../../styles/auth.css';
import '../../styles/index.css';

const useStyles = makeStyles(() => ({
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
  const error = useSelector((state) => state.error.user.auth.forgetPassword);
  const loading = useSelector((state) => state.loading.user.auth.forgetPassword);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleChange = (event) => {
    if (event.target.value === '') {
      setEmail(event.target.value);
      setErrorText('');
      setShowError(false);
      setDisabled(true);
      return;
    }
    const status = event.target.value.indexOf('@') > 0;
    if (!status) {
      setEmail(event.target.value);
      setErrorText('Invalid email address');
      setShowError(true);
      setDisabled(true);
    } else {
      setEmail(event.target.value);
      setErrorText('');
      setShowError(false);
      setDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showError) {
      return;
    }
    dispatch(userForgetPassword(email.trim()));
    setSubmit(true);
  };

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  useEffect(() => {
    if (loading === false && submit === true) {
      if (error !== null) {
        setSubmit(false);
        setErrorText(error);
        setShowError(true);
        setDisabled(true);
      } else {
        setSubmit(false);
        setPopUp(true);
        setErrorText('');
        setShowError(false);
        setDisabled(false);
      }
    }
  }, [error, loading, submit]);

  return (
    <>
      <Card className="auth-form login-form" variant="outlined">
        <CardContent className="auth-form-content">
          <form className={`auth-form-content ${classNames.authForm}`} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              // required
              className={`auth-form-input ${classNames.authTextFields}`}
              error={showError}
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
