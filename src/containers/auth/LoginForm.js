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
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { Link as RouterLink } from 'react-router-dom';
import { authActions } from '../../actions/index';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { userSignIn } = bindActionCreators(authActions, dispatch);
  const loginState = useSelector((state) => state.auth);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    userSignIn(username, password);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            type={showPassword ? 'text' : 'password'}
            className="auth-form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e)}
            error
            helperText="Some error"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button color="primary" onClick={onsubmit}>
            Login
          </Button>
        </div>
        <caption className="login-caption">
          Need a new puppy?
          {' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
          {' '}
        </caption>
        <caption className="login-caption">
          Lost your puppy?
          {' '}
          <Link component={RouterLink} to="/forget-password">
            Reset password
          </Link>
        </caption>
      </CardContent>
    </Card>
  );
}
