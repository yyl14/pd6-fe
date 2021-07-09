import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TextField } from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';

import { authActions } from '../../actions/index';

function checkPassword(password1, password2) {
  if (password1 === password2) {
    return 'Same';
  }
  return 'Password Not Match';
}

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { userResetPassword } = bindActionCreators(authActions, dispatch);
  // const loginState = useSelector((state) => state.auth);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error1, setError1] = useState(false);
  const [errorText1, setErrorText1] = useState('');

  const onSubmit = () => {
    const status = checkPassword(password1, password2);
    if (status === 'Password Not Match') {
      setError1(true);
      setErrorText1(status);
      return;
    }
    setError1(false);
    setErrorText1('');
    // userResetPassword(password2);
  };

  return (
    <div className="reset-password-form">
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="New Password"
          placeholder="New Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          required
          error={error1}
          label="Confirmed Password"
          placeholder="Confirmed Password"
          value={password2}
          helperText={errorText1}
          onChange={(e) => setPassword2(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') onSubmit();
          }}
        />
        <Button onClick={onSubmit}>Send</Button>
      </form>
    </div>
  );
}
