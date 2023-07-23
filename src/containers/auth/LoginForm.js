import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useLogin from '../../lib/account/useLogin';

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

export default function LoginForm() {
  const classNames = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    username: '',
    password: '',
  });
  const {
    logIn,
    isLoading: { logIn: loginLoading },
    error: { logIn: loginError },
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loginLoading) {
      if (loginError != null) {
        setErrors({ username: true, password: true });
        setErrorTexts((ori) => ({ ...ori, password: 'Incorrect username or password' }));
      }
    }
  }, [loginError, loginLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '') {
      setErrors((ori) => ({ ...ori, username: true }));
      setErrorTexts((ori) => ({ ...ori, username: "Can't be empty" }));
    }
    if (password === '') {
      setErrors((ori) => ({ ...ori, password: true }));
      setErrorTexts((ori) => ({ ...ori, password: "Can't be empty" }));
    }

    if (errors.username === false && errors.password === false && username !== '' && password !== '') {
      const {
        data: { success, data },
      } = await logIn({ username, password });
      console.log(success, data);
      if (success) {
        localStorage.setItem('id', data.account_id);
        localStorage.setItem('token', data.token);
        // TODO: not direct to mainpage after login success
      }
    }
  };
  const handleUsernameChange = (e) => {
    if (e.target.value !== '') {
      if (errors.password && errorTexts.password === 'Incorrect username or password') {
        setErrors({
          username: false,
          password: false,
        });
        setErrorTexts({
          username: '',
          password: '',
        });
      } else {
        setErrors((ori) => ({ ...ori, username: false }));
        setErrorTexts((ori) => ({ ...ori, username: '' }));
      }
    }
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (e.target.value !== '') {
      if (errors.password && errorTexts.password === 'Incorrect username or password') {
        setErrors({
          username: false,
          password: false,
        });
        setErrorTexts({
          username: '',
          password: '',
        });
      } else {
        setErrors((ori) => ({ ...ori, password: false }));
        setErrorTexts((ori) => ({ ...ori, password: '' }));
      }
    }
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="auth-form login-form" variant="outlined">
      <CardContent className="auth-form-content">
        <form className={`auth-form-content ${classNames.authForm}`} onSubmit={(e) => handleSubmit(e)}>
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
          <div className={classNames.authButtons}>
            <Button color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>

        <Typography variant="body2" className={classNames.authLink}>
          Need a new puppy?{' '}
          <Link component={RouterLink} to="/register">
            Register
          </Link>{' '}
        </Typography>
        <Typography variant="body2" className={classNames.authLink}>
          Lost your puppy?{' '}
          <Link component={RouterLink} to="/forget-username">
            Find username
          </Link>
          {' or '}
          <Link component={RouterLink} to="/forget-password">
            Reset password
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
