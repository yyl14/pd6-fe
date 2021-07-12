import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
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
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { Link as RouterLink } from 'react-router-dom';
import { authActions } from '../../actions/index';

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { userRegister } = bindActionCreators(authActions, dispatch);
  // const loginState = useSelector((state) => state.auth);
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
  const [popUp, setPopUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const labelName = ['realName', 'school', 'username', 'nickname', 'studentId', 'email', 'password', 'confirmPassword'];

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

    if (errorCnt === 0) setPopUp(true);
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
      switch (value) {
        case 'National Taiwan University':
          setEmailTail('@ntu.edu.tw');
          break;
        case 'National Taiwan Normal University':
          setEmailTail('@ntnu.edu.tw');
          break;
        case 'National Taiwan University of Science and Technology':
          setEmailTail('@mail.ntust.edu.tw');
          break;
        default:
          setEmailTail('@ntu.edu.tw');
      }
    }
  };

  return (
    <>
      <Card className="auth-form register-form" variant="outlined">
        {/* className login-form applies here */}
        <CardContent className="auth-form-content">
          <div className="auth-form-inputs">
            <TextField
              id="realName"
              name="realName"
              className="auth-form-input"
              label="Real Name"
              value={inputs.realName}
              onChange={(e) => handleChange(e)}
              error={errors.realName}
              helperText={errorTexts.realName}
            />
            <FormControl variant="outlined" className="auth-form-input" error={errors.school}>
              <InputLabel id="demo-simple-select-outlined-label">School</InputLabel>
              <Select id="school" name="school" value={inputs.school} onChange={handleChange} label="School">
                <MenuItem value="National Taiwan University">National Taiwan University</MenuItem>
                <MenuItem value="National Taiwan Normal University">National Taiwan Normal University</MenuItem>
                <MenuItem value="National Taiwan University of Science and Technology">
                  National Taiwan University of Science and Technology
                </MenuItem>
              </Select>
              {errors.school ? <FormHelperText>{errorTexts.school}</FormHelperText> : <></>}
            </FormControl>
            <TextField
              id="username"
              name="username"
              className="auth-form-input"
              label="Username"
              value={inputs.username}
              onChange={(e) => handleChange(e)}
              error={errors.username}
              helperText={errorTexts.username}
            />
            <TextField
              id="nickname"
              name="nickname"
              className="auth-form-input"
              label="Nickname"
              value={inputs.nickname}
              onChange={(e) => handleChange(e)}
              error={errors.nickname}
              helperText={errorTexts.nickname}
            />
            <TextField
              id="studentId"
              name="studentId"
              className="auth-form-input"
              label="Student ID"
              value={inputs.studentId}
              onChange={(e) => handleChange(e)}
              error={errors.studentId}
              helperText={errorTexts.studentId}
            />
            <div className="auth-form-input auth-form-input-email">
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
            <TextField
              // required
              className="auth-form-input"
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
              className="auth-form-input"
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
            <Button disabled={disabled} onClick={() => onSubmit()} color="primary">
              Register
            </Button>
          </div>
          <Typography variant="body2" className="register-caption">
            Already have a puppy?
            {' '}
            <Link component={RouterLink} to="/login">
              Log in
            </Link>
          </Typography>
        </CardContent>
      </Card>
      {popUp ? (
        <Dialog
          open={popUp}
          keepMounted
          onClose={() => setPopUp(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h2">Verification email sent</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please check your mailbox to activate the account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPopUp(false)} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}
