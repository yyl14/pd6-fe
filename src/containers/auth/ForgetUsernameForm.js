import { useState, useEffect } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import {
  Button, TextField, Card, CardContent, Typography, makeStyles, Link, Snackbar,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { userForgetUsername } from '../../actions/user/auth';

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

export default function ForgetUsernameForm() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.user.auth.forgetUsername);
  const loading = useSelector((state) => state.loading.user.auth.forgetUsername);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleChange = (event) => {
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
      setDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showError) {
      return;
    }
    dispatch(userForgetUsername(email.trim()));
    setShowSnackbar(true);
    setSubmit(true);
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

          <Typography variant="body2" className={classNames.authLink}>
            Lost your puppy?
            {' '}
            <Link component={RouterLink} to="/forget-password">
              Reset password
            </Link>
            {' '}
          </Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message="Username information will be sent to your mailbox if your email is valid."
      />
    </>
  );
}
