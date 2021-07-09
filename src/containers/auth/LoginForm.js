import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, TextField, Card, CardContent,
} from '@material-ui/core';
import { borders, borderRadius } from '@material-ui/system';

import { authActions } from '../../actions/index';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { userSignIn } = bindActionCreators(authActions, dispatch);
  const loginState = useSelector((state) => state.auth);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    userSignIn(username, password);
  };

  return (
    <Card className="login-form" variant="outlined">
      <CardContent>
        {' '}
        <TextField placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
        {' '}
        <TextField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error
          helperText="Some error"
        />
        {' '}
        <Button onClick={onsubmit}>Submit</Button>
        <Button color="primary" onClick={onsubmit}>
          Submit
        </Button>
        <Button color="secondary" onClick={onsubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
