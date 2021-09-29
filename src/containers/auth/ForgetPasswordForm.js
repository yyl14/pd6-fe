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
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { userForgetPassword } from '../../actions/user/auth';

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
    marginTop: '44px',
    marginBottom: '30px',
  },
  authLink: {
    color: theme.palette.grey.A400,
  },
}));

export default function ForgetPasswordForm() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.user.auth.forgetPassword);
  const loading = useSelector((state) => state.loading.user.auth.forgetPassword);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);

    if (event.target.value === '') {
      setDisabled(true);
      return;
    }

    setDisabled(email === '');
  };

  const handleEmailChange = (event) => {
    if (event.target.value === '') {
      setEmail(event.target.value);
      setErrorText('');
      setShowError(false);
      setDisabled(true);
      return;
    }

    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const status = emailRe.test(event.target.value);

    if (!status) {
      setEmail(event.target.value);
      setErrorText('Invalid email address');
      setShowError(true);
      setDisabled(true);
    } else {
      setEmail(event.target.value);
      setErrorText('');
      setShowError(false);
      setDisabled(username === '');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showError) {
      return;
    }
    dispatch(userForgetPassword(username, email.trim()));
    setSubmit(true);
  };

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  useEffect(() => {
    if (loading === false && submit === true) {
      if (error !== null) {
        switch (error.toString()) {
          case 'Error: NotFound': {
            setErrorText('Unregistered email address.');
            break;
          }
          default: {
            setErrorText(error.toString());
            break;
          }
        }
        setSubmit(false);
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
              label="Username"
              value={username}
              onChange={(e) => handleUsernameChange(e)}
            />
            <TextField
              // required
              className={`auth-form-input ${classNames.authTextFields}`}
              error={showError}
              helperText={errorText}
              label="Registered / Alternative Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
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

          <Typography variant="body2" className={classNames.authLink}>
            Forget your username?
            {' '}
            <Link component={RouterLink} to="/forget-username">
              Find username
            </Link>
            {' '}
          </Typography>
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
