import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SimpleBar from '../ui/SimpleBar';
import AlignedText from '../ui/AlignedText';

import { editPassword } from '../../actions/user/user';

const useStyles = makeStyles(() => ({
  textField: {
    width: '350px',
  },
  topAlignedItem: {
    marginTop: '-10px',
    marginBottom: '23px',
  },
  alignedItem: {
    marginBottom: '23px',
  },
}));

export default function NewPassword() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const authToken = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.user.id);
  // const loading = useSelector((state) => state.loading.user.user.editPassword);
  const serverError = useSelector((state) => state.error.user.user.editPassword);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [helperText, setHelperText] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [popUp, setPopUp] = useState(false);

  const handleResetPassword = () => {
    // change system password
    dispatch(editPassword(authToken, id, oldPassword, newPassword));
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setDisabled(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setDisabled(true);
  };

  useEffect(() => {
    if (oldPassword === '') {
      setErrors((input) => ({ ...input, oldPassword: true }));
      setHelperText((input) => ({ ...input, oldPassword: "Can't be empty!" }));
      return;
    }
    setErrors((input) => ({ ...input, oldPassword: false }));
    setHelperText((input) => ({ ...input, oldPassword: '' }));
  }, [oldPassword]);

  useEffect(() => {
    if (newPassword === '') {
      setErrors((input) => ({ ...input, newPassword: true }));
      setHelperText((input) => ({ ...input, newPassword: "Can't be empty!" }));
      return;
    }
    if (newPassword !== confirmPassword && newPassword !== '') {
      setErrors((input) => ({ ...input, newPassword: false, confirmPassword: true }));
      setHelperText((input) => ({ ...input, newPassword: '', confirmPassword: "Passwords don't match" }));
      return;
    }
    setErrors((input) => ({ ...input, newPassword: false, confirmPassword: false }));
    setHelperText((input) => ({ ...input, newPassword: '', confirmPassword: '' }));
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (serverError) {
      setErrors((input) => ({ ...input, oldPassword: true }));
      setHelperText((input) => ({ ...input, oldPassword: serverError }));
    }
  }, [serverError]);

  useEffect(() => {
    if (errors.oldPassword === false && errors.newPassword === false && errors.confirmPassword === false) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [errors.oldPassword, errors.newPassword, errors.confirmPassword]);

  return (
    <>
      {edit ? (
        <SimpleBar title="Password">
          <>
            <div className={classes.topAlignedItem}>
              <AlignedText text="Current Password" childrenType="field" maxWidth="lg">
                <TextField
                  className={classes.textField}
                  value={oldPassword}
                  variant="outlined"
                  type={showPassword.oldPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  error={errors.oldPassword}
                  helperText={helperText.oldPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword((input) => ({ ...input, oldPassword: !input.oldPassword }));
                          }}
                          edge="end"
                        >
                          {showPassword.oldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </AlignedText>
            </div>
            <div className={classes.alignedItem}>
              <AlignedText text="New Password" childrenType="field" maxWidth="lg">
                <TextField
                  className={classes.textField}
                  value={newPassword}
                  variant="outlined"
                  type={showPassword.newPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  error={errors.newPassword}
                  helperText={helperText.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword((input) => ({ ...input, newPassword: !input.newPassword }));
                          }}
                          edge="end"
                        >
                          {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </AlignedText>
            </div>
            <div className={classes.alignedItem}>
              <AlignedText text="Confirmed Password" childrenType="field" maxWidth="lg">
                <TextField
                  className={classes.textField}
                  value={confirmPassword}
                  variant="outlined"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  error={errors.confirmPassword}
                  helperText={helperText.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword((input) => ({ ...input, confirmPassword: !input.confirmPassword }));
                          }}
                          edge="end"
                        >
                          {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </AlignedText>
            </div>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button color="primary" type="submit" disabled={disabled} onClick={() => setPopUp(true)}>
              Save
            </Button>
          </>
        </SimpleBar>
      ) : (
        <SimpleBar
          title="Password"
          buttons={(
            <>
              <Button onClick={() => setEdit(true)}>Edit</Button>
            </>
          )}
        />
      )}
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">Change password</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to change your password ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPopUp(false);
              handleCancel();
            }}
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setPopUp(false);
              handleResetPassword();
            }}
            color="secondary"
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
