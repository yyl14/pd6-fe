import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, TextField, Grid, Typography, Card, CardContent,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';

import { authActions } from '../../actions/index';

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return 'Password Not Match';
}

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { userResetPassword } = bindActionCreators(authActions, dispatch);
  // const loginState = useSelector((state) => state.auth);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const onSubmit = () => {
    const status = checkPassword(password1, password2);
    if (status === 'Password Not Match') {
      setError(true);
      setErrorText(status);
      return;
    }
    setError(false);
    setErrorText('');
    // userResetPassword(password2);
  };

  return (
    <div className="page auth-page">
      <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid container item xs={6} className="auth-page-col auth-page-col-left" justify="center">
          <Grid item className="auth-title">
            <Typography className="auth-title" variant="h1">
              Go find your puppy!
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6} className="auth-page-col auth-page-col-right" justify="center">
          <Card className="auth-form" varient="outlined">
            <CardContent className="auth-form-content">
              <form className="auth-form-content" onSubmit={onSubmit}>
                <TextField
                  required
                  placeholder="New Password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <TextField
                  required
                  error={error}
                  placeholder="Confirmed Password"
                  value={password2}
                  helperText={errorText}
                  onChange={(e) => setPassword2(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') onSubmit();
                  }}
                />
                <Button onClick={onSubmit} color="primary">Send</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
