import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, TextField, Card, CardContent, Container, Grid, Link,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';

import { Link as RouterLink } from 'react-router-dom';
import { authActions } from '../../actions/index';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { userSignUp } = bindActionCreators(authActions, dispatch);
  const loginState = useSelector((state) => state.auth);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    userSignUp(username, password);
  };

  return (
    <Card className="auth-form" variant="outlined">
      <CardContent className="auth-form-content">
        <div className="auth-form-inputs">
          <TextField
            id="login-username"
            className="auth-form-input"
            placeholder="Account ID"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="login-username"
            className="auth-form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error
            helperText="Some error"
          />
          <Button color="primary" onClick={onsubmit}>
            Login
          </Button>
        </div>
        <caption className="login-caption">
          Already have a puppy?
          {' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
          {' '}
        </caption>
      </CardContent>
    </Card>
  );
}
