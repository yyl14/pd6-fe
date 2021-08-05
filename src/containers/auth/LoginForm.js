import React, { useState } from 'react';
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
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  authTextFields: {
    marginTop: '55px',
  },
  authButtons: {
    marginTop: '57px',
  },
}));

export default function LoginForm(props) {
  const classNames = useStyles();
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
    const newUserName = username.trim();
    const newPassword = password.trim();

    if (newUserName === '') {
      setErrors((ori) => ({ ...ori, username: true }));
      setErrorTexts((ori) => ({ ...ori, username: "Can't be empty" }));
    }
    if (newPassword === '') {
      setErrors((ori) => ({ ...ori, password: true }));
      setErrorTexts((ori) => ({ ...ori, password: "Can't be empty" }));
    }

    if (errors.username === false && errors.password === false && newUserName !== '' && newPassword !== '') {
      props.userSignIn(newUserName, newPassword);
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
            className={`auth-form-input ${classNames.authTextFields}`}
            label="Username"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
            error={errors.username}
            helperText={errorTexts.username}
          />
          <TextField
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className={`auth-form-input ${classNames.authTextFields}`}
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

          <Button className={classNames.authButtons} color="primary" onClick={onsubmit}>
            Login
          </Button>
        </div>

        <Typography variant="body2" className="auth-link">
          Need a new puppy?
          {' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
          {' '}
        </Typography>
        <Typography variant="body2" className="auth-link">
          Lost your puppy?
          {' '}
          <Link component={RouterLink} to="/forget-password">
            Reset password
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
