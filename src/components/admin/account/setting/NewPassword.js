import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Button, TextField, makeStyles, InputAdornment, IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';
import { editPassword } from '../../../../actions/admin/account';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
  gap: {
    marginTop: theme.spacing(2),
  },
}));

export default function NewPassword() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { accountId } = useParams();
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleResetPassword = () => {
    if (password === '') {
      setError(true);
      setErrorText("Can't be empty");
      return;
    }
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
        <SimpleBar
          title="Password"
        >

          <AlignedText text="New Password" childrenType="field" maxWidth="lg">
            <TextField
              className={classes.textfield}
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
                    <IconButton onClick={() => { setShowPassword(!showPassword); }} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </AlignedText>
          <div className={classes.gap}>
            <Button
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={handleResetPassword}
            >
              Save
            </Button>
          </div>
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

    </>
  );
}
