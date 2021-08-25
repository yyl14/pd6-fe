import { useState, useEffect } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { userRegister } from '../../actions/user/auth';
import { getInstitutes } from '../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  authForm: {
    width: '50%',
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
}));

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

export default function RegisterForm() {
  const classNames = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingInstitute = useSelector((state) => state.loading.common.fetchInstitutes);
  const errorRegister = useSelector((state) => state.error.user.auth);
  const institutes = useSelector((state) => state.institutes.byId);
  const institutesId = useSelector((state) => state.institutes.allIds);
  const enableInstitutesId = institutesId.filter((item) => !institutes[item].is_disabled);

  const [nextPage, setNextPage] = useState(false);

  const [inputs, setInputs] = useState({
    realName: '',
    school: 'National Taiwan University',
    username: '',
    nickname: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    realName: false,
    school: false,
    username: false,
    nickname: false,
    studentId: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    realName: '',
    school: '',
    username: '',
    nickname: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailTail, setEmailTail] = useState('@ntu.edu.tw');

  const [disabled, setDisabled] = useState(false);
  const [popup, setPopup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const labelName = ['realName', 'school', 'username', 'nickname', 'studentId', 'email', 'password', 'confirmPassword'];

  useEffect(() => {
    dispatch(getInstitutes());
  }, [dispatch]);

  const transform = (school) => {
    let id = 1;
    enableInstitutesId.forEach((item) => {
      if (institutes[item].full_name === school) {
        id = item;
      }
    });

    return id;
  };

  const onSubmit = () => {
    let errorCnt = 0;
    const newInputs = {};

    labelName.forEach((name) => {
      newInputs[name] = inputs[name].trim();
      if (newInputs[name] === '') {
        setErrors((input) => ({ ...input, [name]: true }));
        setErrorTexts((input) => ({ ...input, [name]: "Can't be empty" }));
        errorCnt += 1;
      }
    });

    // check password
    const statusP = checkPassword(newInputs.password, newInputs.confirmPassword);
    if (statusP === "Passwords don't match") {
      setErrors((input) => ({ ...input, confirmPassword: true }));
      setErrorTexts((input) => ({ ...input, confirmPassword: statusP }));
      errorCnt += 1;
    }

    labelName.forEach((name) => {
      if (errors[name] === true) {
        errorCnt += 1;
      }
    });

    if (errorCnt === 0) {
      dispatch(
        userRegister(
          inputs.username,
          inputs.password,
          inputs.nickname,
          inputs.realName,
          inputs.email,
          transform(inputs.school),
          inputs.studentId,
          `${inputs.email}${emailTail}`,
        ),
      );
      if (errorRegister.signup === 'StudentCardExists') {
        setErrors((input) => ({ ...input, username: true }));
        setErrorTexts((input) => ({ ...input, username: 'Username is taken, try another' }));
      } else {
        setPopup(true);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
    if (value !== '' && errorTexts[name] === "Can't be empty") {
      setErrors((input) => ({ ...input, [name]: false }));
      setErrorTexts((input) => ({ ...input, [name]: '' }));
    }

    if (name === 'confirmPassword' || name === 'password') {
      const statusP = checkPassword(inputs.password, value);
      if (statusP === "Passwords don't match") {
        setErrors((input) => ({ ...input, confirmPassword: true }));
        setErrorTexts((input) => ({ ...input, confirmPassword: "Passwords don't match" }));
      } else {
        setErrors((input) => ({ ...input, confirmPassword: false }));
        setErrorTexts((input) => ({ ...input, confirmPassword: '' }));
      }
    }

    // change email tail
    if (name === 'school') {
      setEmailTail(`@${institutes[transform(value)].email_domain}`);
    }
  };

  const onClosePopup = () => {
    setPopup(false);
    history.push('/login');
  };

  if (loadingInstitute) {
    return <div>loading...</div>;
  }

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
                    <MenuItem key={item} value={institutes[item].full_name}>
                      {institutes[item].full_name}
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
                <Button disabled={disabled} onClick={() => setNextPage(true)} color="primary">
                  Next
                </Button>
              </div>
            </form>
            <Typography variant="body2" className={classNames.authLink}>
              Already have a puppy?
              {' '}
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
                error={errors.nickname}
                helperText={errorTexts.nickname}
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
                <Button disabled={disabled} onClick={() => setNextPage(false)}>
                  Back
                </Button>
                <Button disabled={disabled} onClick={() => onSubmit()} color="primary">
                  Register
                </Button>
              </div>
            </form>
            <Typography variant="body2" className={classNames.authLink}>
              Already have a puppy?
              {' '}
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            </Typography>
          </CardContent>
        </Card>
      )}
      {popup && (
        <Dialog
          open={popup}
          keepMounted
          onClose={() => setPopup(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
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
