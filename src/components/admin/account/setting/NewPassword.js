import React, { useState } from 'react';
import {
  Button, TextField, Typography, makeStyles, InputAdornment, IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SimpleBar from '../../../ui/SimpleBar';
import AlignedText from '../../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '350px',
  },
}));

export default function NewPassword() {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = () => {
    // change system password
    setEdit(false);
    setPassword('');
    setDisabled(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setPassword('');
    setDisabled(true);
  };

  return (
    <>
      {edit ? (
        <SimpleBar
          title="Password"
        >
          <p>
            <AlignedText text="New Password" childrenType="field" maxWidth="lg">
              <TextField
                className={classes.textfield}
                value={password}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setDisabled(false);
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
          </p>
          <Button
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={disabled}
            onClick={handleResetPassword}
          >
            Save
          </Button>
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
