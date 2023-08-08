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
import { useMemo, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQuery';
import useLogin from '@/lib/auth/useLogin';
import useAuthStore from '@/stores/authStore';

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
  const history = useHistory();
  const query = useQuery();
  const redirectUrl = useMemo(() => query.get('redirectUrl'), [query]);
  const classNames = useStyles();

  const setAuth = useAuthStore((state) => state.set);

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
  const { logIn } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      try {
        const {
          data: { success, data },
        } = await logIn({ username, password });

        if (success) {
          setAuth(data.token, String(data.account_id));

          if (redirectUrl) {
            history.push(redirectUrl);
          } else {
            history.push('/6a');
          }
        }
      } catch (err) {
        setErrors({ username: true, password: true });
        setErrorTexts((ori) => ({ ...ori, password: 'Incorrect username or password' }));
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
        <form className={`auth-form-content ${classNames.authForm}`} onSubmit={handleSubmit}>
          <TextField
            id="login-username"
            className={classNames.authTextFields}
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            error={errors.username}
            helperText={errorTexts.username}
          />
          <TextField
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className={classNames.authTextFields}
            label="Password"
            value={password}
            onChange={handlePasswordChange}
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
          <Link component={RouterLink} to="/6a/register">
            Register
          </Link>{' '}
        </Typography>
        <Typography variant="body2" className={classNames.authLink}>
          Lost your puppy?{' '}
          <Link component={RouterLink} to="/6a/forget-username">
            Find username
          </Link>
          {' or '}
          <Link component={RouterLink} to="/6a/forget-password">
            Reset password
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
