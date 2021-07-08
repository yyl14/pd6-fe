import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
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
    <div className="login-form">
      <span>{String(loginState)}</span>
      {' '}
      <input placeholder="username" value={username} onChange={(e) => setUserName(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onsubmit}>Log In</Button>
      {' '}
      <Button color="secondary" onClick={onsubmit}>
        Log In
      </Button>
      {' '}
      <Button color="primary" onClick={onsubmit}>
        Log In
      </Button>
    </div>
  );
}
