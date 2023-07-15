import { Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Trademark from '../../components/auth/Trademark';
import LoginForm from './LoginForm';

import '../../styles/auth.css';
import '../../styles/index.css';

export default function Login() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.title = 'Signin';
    return () => {
      document.title = 'PDOGS';
    };
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem('id', user.id);
      localStorage.setItem('token', auth.token);
      history.push('/');
    }
  }, [auth.isAuthenticated, auth.token, history, user.id]);

  return (
    <div className="page auth-page">
      <Grid className="auth-page-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid container item xs={6} className="auth-page-col auth-page-col-left" justifyContent="center">
          <Typography className="auth-title" variant="h3">
            Login and train your puppy!
          </Typography>
        </Grid>
        <Grid container item xs={6} className="auth-page-col auth-page-col-right" justifyContent="center">
          <LoginForm />
        </Grid>
        <Trademark />
      </Grid>
    </div>
  );
}
