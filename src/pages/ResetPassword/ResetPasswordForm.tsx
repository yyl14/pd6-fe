import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQuery';
import useResetPassword from '@/lib/auth/useResetPassword';

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
  snackbar: {},
}));

function checkPassword(password1: string, password2: string) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

export default function ResetPassword() {
  const classNames = useStyles();
  const query = useQuery();
  const history = useHistory();

  const { resetPassword } = useResetPassword();

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [popUp, setPopUp] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>('');

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>,
  ) => {
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

    try {
      const res = resetPassword({
        code: query.get('code') as string,
        password: confirmPassword,
      });
      if ((await res).ok) {
        setPopUp(true);
      }
    } catch (err) {
      setErrorPopup(true);
      const errorMessage = err as Error;
      setErrorMsg(errorMessage.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
    history.push('/login');
    setPopUp(false);
  };

  const handleClose = () => {
    setErrorPopup(false);
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
              Reset
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog open={popUp} keepMounted onClose={() => handleClosePopUp()}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Password reset success</Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()}>Done</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorPopup}
        onClose={handleClose}
        message={`Error: ${errorMsg}`}
        key="errorMsg"
        className={classNames.snackbar}
      />
    </>
  );
}
