import { useState } from 'react';
import React, { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { userResetPassword } from '../../actions/user/auth';

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

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const [popUp, setPopUp] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPassword = password1.trim();
    const confirmPassword = password2.trim();
    const status = checkPassword(newPassword, confirmPassword);
    if (status === "Passwords don't match") {
      setError(true);
      setErrorText(status);
      setDisabled(true);
      return;
    }
    setError(false);
    setErrorText('');
    dispatch(userResetPassword(query.get('code'), confirmPassword));
    history.push('/login');
    // setPopUp(true);
  };

  const handleChange = (event) => {
    if (event.target.value === '') {
      setPassword2(event.target.value);
      setErrorText('');
      setError(false);
      setDisabled(true);
      return;
    }
    const status = checkPassword(password1, event.target.value);
    if (status === "Passwords don't match") {
      setPassword2(event.target.value);
      setErrorText(status);
      setError(true);
      setDisabled(true);
    } else {
      setPassword2(event.target.value);
      setErrorText('');
      setError(false);
      setDisabled(false);
    }
  };

  // const handleClosePopUp = () => {
  //   setPopUp(false);
  // };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <>
      <Card className="auth-form login-form" variant="outlined">
        <CardContent className="auth-form-content">
          <form className={`auth-form-content ${classNames.authForm}`} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              // required
              label="New Password"
              className={`auth-form-input ${classNames.authTextFields}`}
              type={showPassword1 ? 'text' : 'password'}
              // placeholder="New  Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword1} edge="end">
                      {showPassword1 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              // required
              error={error}
              type={showPassword2 ? 'text' : 'password'}
              label="Confirm New Password"
              className={`auth-form-input ${classNames.authTextFields}`}
              // placeholder="Confirmed Password"
              value={password2}
              helperText={errorText}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword2} edge="end">
                      {showPassword2 ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              className={classNames.authButtons}
              disabled={disabled}
              onClick={(e) => handleSubmit(e)}
              color="primary"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* {popUp ? (
        <Dialog
          open={popUp}
          keepMounted
          onClose={() => handleClosePopUp()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h4">Password reset success</Typography>
          </DialogTitle>
          <DialogContent>Please check your mailbox to the account.</DialogContent>
          <DialogActions>
            <Button onClick={() => handleClosePopUp()}>Done</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )} */}
    </>
  );
}
