import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { authActions } from '../../actions/index';

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { userResetPassword } = bindActionCreators(authActions, dispatch);
  // const loginState = useSelector((state) => state.auth);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const onSubmit = () => {
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
    // userResetPassword(confirmPassword);
    setPopUp(true);
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

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <>
      <Card className="auth-form login-form" variant="outlined">
        {/* className login-form applies here */}
        <CardContent className="auth-form-content">
          <form className="auth-form-content" onSubmit={() => onSubmit()}>
            <TextField
              // required
              label="New Password"
              className="auth-form-input"
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
              label="Confirmed Password"
              className="auth-form-input"
              // placeholder="Confirmed Password"
              value={password2}
              helperText={errorText}
              onChange={(e) => handleChange(e)}
              onKeyPress={(event) => {
                if (event.key === 'Enter') onSubmit();
              }}
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
            <Button disabled={disabled} onClick={() => onSubmit()} color="primary">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
      {popUp ? (
        <Dialog
          open={popUp}
          keepMounted
          onClose={() => handleClosePopUp()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h2">Password reset success</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Go train your puppy right now!</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClosePopUp()} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}
