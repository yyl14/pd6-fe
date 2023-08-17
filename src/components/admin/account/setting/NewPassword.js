import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editPassword } from '../../../../actions/admin/account';
import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';

const useStyles = makeStyles(() => ({
  buttons: {
    marginTop: '6px',
    marginLeft: '-5px',
  },
}));

export default function NewPassword() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [dialog, setDialog] = useState(false);

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleResetPassword = () => {
    if (password === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
    setDialog(true);
  };

  const handleConfirm = () => {
    setDialog(false);
    dispatch(editPassword(authToken, accountId, password));
    setEdit(false);
    setPassword('');
  };

  const handleCancel = () => {
    setError(false);
    setErrorText('');
    setEdit(false);
    setPassword('');
  };

  return (
    <>
      {edit ? (
        <SimpleBar title="Password">
          <AlignedText text="New Password" childrenType="field" maxWidth="lg">
            <TextField
              value={password}
              error={error}
              helperText={errorText}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </AlignedText>
          <div className={classes.buttons}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleResetPassword}>
              Save
            </Button>
          </div>
        </SimpleBar>
      ) : (
        <SimpleBar
          title="Password"
          buttons={
            <>
              <Button onClick={() => setEdit(true)}>Edit</Button>
            </>
          }
        />
      )}
      <Dialog open={dialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Change Password</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textPrimary">
            Do you want to change this account’s password?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleConfirm}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
