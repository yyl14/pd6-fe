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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { borders, borderRadius } from '@material-ui/system';

import { authActions } from '../../actions/index';

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return "Passwords don't match";
}

function checkEmailFormat(email) {
  // console.log('checkEmailFormat: ', email.indexOf('@ntu.edu.tw'));
  const index1 = email.indexOf('@ntu.edu.tw'); // 台大
  const index2 = email.indexOf('@mail.ntust.edu.tw'); // 台科大
  const index3 = email.indexOf('@ntnu.edu.tw'); // 台師大
  if (email === '') {
    return '';
  }
  if (index1 <= 0 && index2 <= 0 && index3 <= 0) {
    return 'Invalid email address';
  }
  return '';
}

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { userRegister } = bindActionCreators(authActions, dispatch);
  // const loginState = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState({
    realName: '',
    school: '',
    accountId: '',
    nickname: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassord: '',
  });

  const [errors, setErrors] = useState({
    realName: false,
    school: false,
    accountId: false,
    nickname: false,
    studentId: false,
    email: false,
    password: false,
    confirmPassord: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    realName: '',
    school: '',
    accountId: '',
    nickname: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassord: '',
  });

  const [disabled, setDisabled] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = () => {
    setPopUp(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  const handleClickShowPassword1 = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword2 = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Card className="auth-form" variant="outlined">
        <CardContent className="auth-form-content">
          <div className="auth-form-inputs">
            <TextField
              id="realName"
              name="realName"
              className="auth-form-input"
              label="Real Name"
              value={inputs.realName}
              onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" className="auth-form-input">
              <InputLabel id="demo-simple-select-outlined-label">School</InputLabel>
              <Select
                id="school"
                name="school"
                value={inputs.school}
                onChange={handleChange}
                label="School"
              >
                <MenuItem value="National Taiwan University">National Taiwan University</MenuItem>
                <MenuItem value="National Taiwan Normal University">National Taiwan Normal University</MenuItem>
                <MenuItem value="National Taiwan University of Science and Technology">National Taiwan University of Science and Technology</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="accountId"
              name="accountId"
              className="auth-form-input"
              label="Account ID"
              value={inputs.accountId}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="nickname"
              name="nickname"
              className="auth-form-input"
              label="Nickname"
              value={inputs.nickname}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="studentId"
              name="studentId"
              className="auth-form-input"
              label="Student ID"
              value={inputs.studentId}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              id="email"
              name="email"
              className="auth-form-input"
              label="Email"
              value={inputs.email}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              // required
              className="auth-form-input"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              // placeholder="New Password"
              value={inputs.password}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword1} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              // required
              className="auth-form-input"
              name="confirmPassord"
              error={errors.confirmPassord}
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              value={inputs.confirmPassord}
              helperText={errorTexts.confirmPassord}
              onChange={(e) => handleChange(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword2} edge="end">
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
        </CardContent>
      </Card>
      {popUp ? (
        <Dialog
          open={popUp}
          keepMounted
          onClose={() => handleClosePopUp()}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h2">Verification email sent</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Please check your mailbox to activate the account</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClosePopUp()} color="primary">
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
