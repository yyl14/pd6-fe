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
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const onsubmit = () => {
    if (username === '') {
      setErrors((ori) => ({ ...ori, username: true }));
      setErrorTexts((ori) => ({ ...ori, username: "Can't be empty" }));
    }
    if (password === '') {
      setErrors((ori) => ({ ...ori, password: true }));
      setErrorTexts((ori) => ({ ...ori, password: "Can't be empty" }));
    }

    if (errors.username === false && errors.password === false && username !== '' && password !== '') {
      userSignIn(username, password);
    }
  };

  const handleUsernameChange = (e) => {
    if (e.target.value !== '') {
      setErrors((ori) => ({ ...ori, username: false }));
      setErrorTexts((ori) => ({ ...ori, username: '' }));
    }
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.value !== '') {
      setErrors((ori) => ({ ...ori, password: false }));
      setErrorTexts((ori) => ({ ...ori, password: '' }));
    }
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="auth-form login-form" variant="outlined">
      <CardContent className="auth-form-content">
        <div className="auth-form-inputs">
          <TextField
            id="login-username"
            className="auth-form-input"
            label="Username"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
            error={errors.username}
            helperText={errorTexts.username}
          />
          <TextField
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className="auth-form-input"
            label="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            error={errors.password}
            helperText={errorTexts.password}
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
