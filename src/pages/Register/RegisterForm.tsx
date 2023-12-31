import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import useReduxStateShape from '@/hooks/useReduxStateShape';
import useRegister from '@/lib/auth/useRegister';
import useInstitutes from '@/lib/institute/useInstitutes';

import { ErrorState, ErrorTextState, Institute, RegisterFormInputs } from './types';

const useStyles = makeStyles((theme) => ({
  authForm: {
    width: '70%',
  },
  authTextFields: {
    width: '100%',
    marginTop: '50px',
  },
  authTextFieldsComplex: {
    width: '100%',
    marginTop: '40px',
  },
  authButtons: {
    marginTop: '44px',
    marginBottom: '30px',
  },
  authLink: {
    color: theme.palette.grey.A400,
  },
  snackbar: {
    width: '400px',
  },
}));

function checkPassword(password1: string, password2: string) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

const initialErrorState = {
  realName: false,
  school: false,
  username: false,
  studentId: false,
  email: false,
  password: false,
  confirmPassword: false,
};

const initialErrorTextState = {
  realName: '',
  school: '',
  username: '',
  studentId: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm() {
  const classNames = useStyles();
  const history = useHistory();
  const { register } = useRegister();
  const { institutes } = useInstitutes();
  const [institutesById, institutesIds] = useReduxStateShape<Institute>(institutes);
  const enableInstitutesId = (institutesIds as number[]).filter((id) => !institutesById[id].is_disabled);
  const [nextPage, setNextPage] = useState(false);
  const [inputs, setInputs] = useState<RegisterFormInputs>({
    realName: '',
    school: 'National Taiwan University',
    username: '',
    nickname: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorState>(initialErrorState);
  const [errorTexts, setErrorTexts] = useState<ErrorTextState>(initialErrorTextState);

  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');
  const [popup, setPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const labelName = ['realName', 'school', 'username', 'studentId', 'email', 'password', 'confirmPassword'];
  const transform = (school: string): number => {
    const ids: number[] = enableInstitutesId.filter((id) => institutesById[id].full_name === school);
    return ids.length === 0 ? 1 : ids[0];
  };
  const onSubmit = async () => {
    const newInputs = labelName.reduce(
      (acc, item) => ({ ...acc, [item]: inputs[item as keyof typeof inputs].trim() }),
      {},
    ) as RegisterFormInputs;

    let hasError = labelName.reduce(
      (acc, item) => acc || newInputs[item as keyof typeof newInputs].trim() === '',
      false,
    );
    setErrors(
      labelName.reduce(
        (acc, item) => ({ ...acc, [item]: newInputs[item as keyof typeof newInputs].trim() === '' }),
        initialErrorState,
      ),
    );
    setErrorTexts(
      labelName.reduce(
        (acc, item) => ({
          ...acc,
          [item]: newInputs[item as keyof typeof newInputs].trim() === '' && "Can't be empty",
        }),
        initialErrorTextState,
      ),
    );

    // check password
    const statusP = checkPassword(newInputs.password.trim(), newInputs.confirmPassword.trim());
    if (statusP === "Passwords don't match") {
      setErrors((input) => ({ ...input, confirmPassword: true }));
      setErrorTexts((input) => ({ ...input, confirmPassword: statusP }));
      hasError = true;
    }
    if (!hasError) {
      try {
        const res = register({
          username: inputs.username.trim(),
          password: inputs.password.trim(),
          nickname: inputs.nickname.trim(),
          real_name: inputs.realName.trim(),
          institute_id: transform(inputs.school),
          student_id: inputs.studentId.trim(),
          institute_email_prefix: inputs.email.trim(),
        });
        if ((await res).ok) {
          setPopup(true);
        }
      } catch (err) {
        const errorMessage = err as Error;
        switch (errorMessage.message) {
          case 'UsernameExists': {
            setErrors((input) => ({ ...input, username: true }));
            setErrorTexts((input) => ({ ...input, username: 'Username Exists' }));
            break;
          }
          case 'StudentCardExists': {
            setErrors((input) => ({ ...input, studentId: true }));
            setErrorTexts((input) => ({ ...input, studentId: 'Student ID Exists' }));
            setNextPage(false);
            break;
          }
          case 'StudentIdNotMatchEmail': {
            setErrors((input) => ({ ...input, studentId: true, email: true }));
            setErrorTexts((input) => ({
              ...input,
              studentId: 'StudentIdNotMatchEmail',
              email: 'StudentIdNotMatchEmail',
            }));
            setNextPage(false);
            break;
          }
          default: {
            setErrorMsg(errorMessage.message);
            setErrorPopup(true);
          }
        }
      }
    }
  };
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const { name, value } = event.target;
    const key = name as keyof typeof errorTexts;
    const valueString = (value as string).trim();
    setInputs((input) => ({ ...input, [key]: valueString }));
    if (valueString !== '' && errorTexts[key] === "Can't be empty") {
      setErrors((input) => ({ ...input, [key]: false }));
      setErrorTexts((input) => ({ ...input, [key]: '' }));
    }
    if (name === 'confirmPassword' || name === 'password') {
      if (
        checkPassword(inputs.password, valueString) === "Passwords don't match" &&
        checkPassword(inputs.confirmPassword, valueString) === "Passwords don't match"
      ) {
        setErrors((input) => ({ ...input, confirmPassword: true }));
        setErrorTexts((input) => ({ ...input, confirmPassword: "Passwords don't match" }));
      } else {
        setErrors((input) => ({ ...input, confirmPassword: false }));
        setErrorTexts((input) => ({ ...input, confirmPassword: '' }));
      }
    }

    // change email tail
    if (name === 'school') {
      setEmailTail(`@${institutesById[transform(valueString)].email_domain}`);
    }
    if (name === 'username' && errorTexts[name] === 'Username Exists') {
      setErrors((input) => ({ ...input, username: false }));
      setErrorTexts((input) => ({ ...input, username: '' }));
    }
    if (name === 'studentId') {
      if (errorTexts[name] === 'Student ID Exists') {
        setErrors((input) => ({ ...input, studentId: false }));
        setErrorTexts((input) => ({ ...input, studentId: '' }));
      } else if (errorTexts[name] === 'StudentIdNotMatchEmail') {
        setErrors((input) => ({ ...input, studentId: false, email: false }));
        setErrorTexts((input) => ({ ...input, studentId: '', email: '' }));
      }
    }
    if (name === 'email') {
      if (errorTexts[name] === 'Email Exists') {
        setErrors((input) => ({ ...input, email: false }));
        setErrorTexts((input) => ({ ...input, email: '' }));
      } else if (errorTexts[name] === 'StudentIdNotMatchEmail') {
        setErrors((input) => ({ ...input, studentId: false, email: false }));
        setErrorTexts((input) => ({ ...input, studentId: '', email: '' }));
      }
    }
  };
  const onClosePopup = () => {
    setPopup(false);
    history.push('/login');
  };
  const handleClose = () => {
    setErrorPopup(false);
  };
  const onNextPage = () => {
    const checkError = (name: string) => {
      if (name === 'username' || name === 'password' || name === 'confirmPassword') return false;
      if (inputs[name as keyof typeof inputs].trim() !== '') return false;
      return true;
    };
    setErrors(labelName.reduce((acc, item) => ({ ...acc, [item]: checkError(item) }), initialErrorState));
    setErrorTexts(
      labelName.reduce(
        (acc, item) => ({ ...acc, [item]: checkError(item) ? "Can't be empty" : '' }),
        initialErrorTextState,
      ),
    );
    const hasError = labelName.reduce((acc, item) => acc || checkError(item), false);
    if (!hasError) {
      setNextPage(true);
    }
  };

  return (
    <>
      {!nextPage ? (
        <Card className="auth-form register-form" variant="outlined">
          <CardContent className="auth-form-content">
            <form className={`auth-form-content ${classNames.authForm}`}>
              <TextField
                id="realName"
                name="realName"
                className={`auth-form-input ${classNames.authTextFields}`}
                label="Real Name"
                value={inputs.realName}
                onChange={(e) => handleChange(e)}
                error={errors.realName}
                helperText={errorTexts.realName}
              />
              <FormControl
                variant="outlined"
                className={`auth-form-input ${classNames.authTextFields}`}
                error={errors.school}
              >
                <InputLabel id="demo-simple-select-outlined-label">School</InputLabel>
                <Select id="school" name="school" value={inputs.school} onChange={handleChange} label="School">
                  {enableInstitutesId.map((item) => (
                    <MenuItem key={item} value={institutesById[item].full_name}>
                      {institutesById[item].full_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.school ? <FormHelperText>{errorTexts.school}</FormHelperText> : <></>}
              </FormControl>
              <TextField
                className={`auth-form-input ${classNames.authTextFields}`}
                id="studentId"
                name="studentId"
                label="Student ID"
                value={inputs.studentId}
                onChange={(e) => handleChange(e)}
                error={errors.studentId}
                helperText={errorTexts.studentId}
              />
              <div className={`auth-form-input ${classNames.authTextFieldsComplex} auth-form-input-email`}>
                <TextField
                  id="email"
                  name="email"
                  className="auth-form-input-email-text"
                  label="Email"
                  value={inputs.email}
                  onChange={(e) => handleChange(e)}
                  error={errors.email}
                  helperText={errorTexts.email}
                  style={{ marginLeft: '0px', marginRight: '10px' }}
                />
                <Typography className="auth-form-input-email-tail" variant="h6">
                  {emailTail}
                </Typography>
              </div>
              <div className={classNames.authButtons}>
                <Button onClick={onNextPage} color="primary">
                  Next
                </Button>
              </div>
            </form>
            <Typography variant="body2" className={classNames.authLink}>
              Already have a puppy?{' '}
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card className="auth-form register-form" variant="outlined">
          <CardContent className="auth-form-content">
            <form className={`auth-form-content ${classNames.authForm}`}>
              <TextField
                className={`auth-form-input ${classNames.authTextFields}`}
                id="username"
                name="username"
                label="Username"
                value={inputs.username}
                onChange={(e) => handleChange(e)}
                error={errors.username}
                helperText={errorTexts.username}
              />
              <TextField
                className={`auth-form-input ${classNames.authTextFields}`}
                id="nickname"
                name="nickname"
                label="Nickname"
                value={inputs.nickname}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                // required
                className={`auth-form-input ${classNames.authTextFields}`}
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                // placeholder="New Password"
                value={inputs.password}
                onChange={(e) => handleChange(e)}
                error={errors.password}
                helperText={errorTexts.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                // required
                className={`auth-form-input ${classNames.authTextFields}`}
                name="confirmPassword"
                error={errors.confirmPassword}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                value={inputs.confirmPassword}
                helperText={errorTexts.confirmPassword}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className={classNames.authButtons}>
                <Button onClick={() => setNextPage(false)}>Back</Button>
                <Button onClick={() => onSubmit()} color="primary">
                  Register
                </Button>
              </div>
            </form>
            <Typography variant="body2" className={classNames.authLink}>
              Already have a puppy?{' '}
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorPopup}
        onClose={handleClose}
        message={`Error: ${errorMsg}`}
        key="errorMsg"
        className={classNames.snackbar}
      />
      {popup && (
        <Dialog open={popup} keepMounted onClose={() => setPopup(false)}>
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h4">Verification email sent</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please check your mailbox to activate the account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClosePopup} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
