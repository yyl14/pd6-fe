import { useState } from 'react';
import React, { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      <button type="button" onClick={onsubmit}>
        Log In
      </button>
    </div>
  );
}
